class WritePacket {

	constructor(net, options = null, { success = null, error = null } = {}) {           
		this.queue = [];	// queue list if too much packet
		this.busy = false;	// sending status
		this.data = [];		// current binary packet array
		this.history = { request: [], response: null };	// last sent data and response
		this.client = net.connect(options);		// open connection between server and client
		this.client.on('data', data => {		// callback when we get answer
			// if we forget to destroy the instance then it will listen to server
			// but maybe we don't want call the callback if not needed
			if (!this.history) {
				this.history.response = data;
				return (success && success(data));
			}			
		});
		this.client.on('error', data => {		// if error handler
			this.data = [];
			return error(err || 'Error: Cannot connect to server'); 
		});
		
		this.SendNext = this.SendNext.bind(this);
	 
	}

	// destroy connection
	Destroy() {
		this.client.destroy();
	}

	// write more byte, like 0x00
	WriteBytes(value, method = "push") {
		typeof value !== "object" && (value = [value]); 
		value.forEach(e => this.data[method](e));
	}
	
	// convert integer to byte
	WriteUByte(value, method = "push") {
		const buf = Buffer.allocUnsafe(1);
		buf.writeUInt8(value, 0);
		this.data[method](...this.format(buf));
	}
	
	// write 2 byte, ex: 00 00
	WriteUInt16(value, method = "push") {
		const buf = Buffer.allocUnsafe(4);
		buf.writeInt16BE(value, 0);
		this.data[method](...this.format(buf));
	}

	// write 4 byte, ex: 00 00 00 00
	WriteUInt32(value, method = "push") {
		const buf = Buffer.allocUnsafe(4);
		buf.writeInt32BE(value, 0);
		this.data[method](...this.format(buf));
	}

	// convert float to byte, 4 byte, ex: 00 00 00 00
	WriteFloat(value, method = "push") {
		const buf = Buffer.allocUnsafe(4);
		buf.writeFloatLE(value, 0);
		this.data[method](...this.format(buf).reverse());
	}
	
	// split octet into bytes
	WriteOctets(value = "") {
		const byteLength = value.length / 2;
		if (value && value.match(/[0-9A-Fa-f]{6}/g)) {
			console.log("HEXA OCTET")	
			// old version	
			// value = pack("H*", value);
			// Hex string, high nibble first
		}
		this.CUInt(byteLength);
		if (value && byteLength) {
			this.data.push(...value.match(/.{2}/g));
		}
	}
	
	// convert string into bytes, ex: utf8 - 0a, utf16le - 00 0a
	WriteUString(value = "", coding = "utf16le") {
		if (!value) { return this.CUInt(buf.length); }
		const buf = this.format(Buffer.from(value, coding));
		this.CUInt(buf.length);
		this.data.push(...buf);
	}
	
	// dynamic data, depend on values, could be 1,2,4 byte
	WriteCUInt32(value) {
		this.CUInt(value);
	}
	
	// split hexadec string into byte array
	format(buf) {
		return buf.toString('hex').match(/.{2}/g).map(e => "0x"+e)
	}
	
	// insert opcode and length to the begining of data
	Pack(value) {
		const len = this.data.length;
		this.CUInt(len, "unshift");
		if (typeof value === "object") {
			value.reverse().forEach(e => this.WriteUByte(e, "unshift"));
		} else {
			this.CUInt(value, "unshift");
		}
	}

	// send data to server if we can, else add to queue list
	SendPacket() {
		this.busy 
			? this.queue.push(this.data) 
			: this.client.write(Buffer.from(this.data), 'utf8', this.SendNext);
		this.busy = true;
	}
	
	// send next data from queue list
	SendNext() {
		this.busy = false
		this.history.request.push(Buffer.from(this.data));		
		if (this.queue && this.queue.length > 0) {
			this.data = this.queue.shift();
			this.SendPacket();
		}
	}
	
	// convert number ( could be 1, 2 or 4 byte) 
	CUInt(value, method = "push") {
		if (value <= 0x7F) { 
			return this.WriteUByte(value, method);
		} else if (value <= 0x3FFF) {
			return this.WriteUInt16(value, method);
		} else if ($value <= 0x1FFFFFFF) {
			return this.WriteUInt32(value, method);
		} else {
			return this.WriteUByte(224, method) || this.WriteUInt32(value, method);
		}
	}
}

/* ReadPackets not done !!!! */

class ReadPacket {

	constructor(data = null) {
		this.data = Buffer.from(data, 'binary');
			//const n = Buffer.from(data, 'binary');                
			//const resp = new ReadPacket(data);
			//console.log(n.toString('utf16le',0));		
        this.pos = null;
	}
	
	ReadBytes(length) {
		value = substr(this.data, this.pos, length);
		this.pos += length;
		
		return value;
	}
	
	ReadUByte() {
		value = unpack("C", this.data.substr(this.pos, 1));
		this.pos++;
		
		return value[1];
	}
	
        ReadFloat() {
		value = unpack("f", strrev(this.data.substr(this.pos, 4)));
		this.pos += 4;
		
		return value[1];
	}
	
	ReadUInt32() {
		value = unpack("N", this.data.substr(this.pos, 4));
		this.pos += 4;
		
		return value[1];
	}
	
	ReadUInt16() {
		value = unpack("n", this.data.substr(this.pos, 2));
		this.pos += 2;
		
		return value[1];
	}
	
	
	ReadOctets() {
		length = this.ReadCUInt32();
	
		value = unpack("H*", this.data.substr(this.pos, length));
		this.pos += length;
		
		return value[1];
	}
	
	ReadUString() {
		length = this.ReadCUInt32();
	
		value = iconv("UTF-16", "UTF-8", this.data.substr(this.pos, length)); // LE?
		this.pos += length;
		
		return value;
	}
	
	ReadPacketInfo() {
		packetinfo['Opcode'] = this.ReadCUInt32();
		packetinfo['Length'] = this.ReadCUInt32();
		return packetinfo;
	}
	
	Seek(value) {
		this.pos += value;
	}
	
	ReadCUInt32() {
		value = unpack("C", this.data.substr(this.pos, 1));
		value = value[1];
		this.pos++;
		
		switch(value & 0xE0)
		{
			case 0xE0:
				value = unpack("N", this.data.substr(this.pos, 4));
				value = value[1];
				this.pos += 4;
				break;
			case 0xC0:
				value = unpack("N", this.data.substr(this.pos - 1, 4));
				value = value[1] & 0x1FFFFFFF;
				this.pos += 3;
				break;
			case 0x80:
			case 0xA0:
				value = unpack("n", this.data.substr(this.pos - 1, 2));
				value = value[1] & 0x3FFF;
				this.pos++;
				break;
		}
		
		return value;
	}
}


module.exports = { ReadPacket, WritePacket };