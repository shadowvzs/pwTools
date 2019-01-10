const net = require('net');
const host = "127.0.0.1";

class WritePacket {

	constructor(port = null) {
		this.queue = [];	// queue list if too much packet
		this.data = [];		// current binary packet array
		this.client = net.connect({ host, port });		// open connection between server and client
	}

	// split hexadec string into byte array
	format(buf) {
		return buf.toString('hex').match(/.{2}/g).map(e => "0x"+e)
	}
	

	// write more byte, like 0x00
	WriteBytes(value, method = "push") {
		typeof value !== "object" && (value = [value]); 
		value.forEach(e => this.data[method](e));
	}
	
	// convert integer to byte
	WriteUByte(value, method = "push") {
		const buf = Buffer.allocUnsafe(1);
		value === -1 && (value = 0xff);
		buf.writeUInt8(value, 0);
		this.data[method](...this.format(buf));
	}

	// write 2 byte, ex: 00 00
	WriteUInt16(value, method = "push") {
		const buf = Buffer.allocUnsafe(2);
		value === -1 && (value = 0xffff);
		buf.writeUInt16BE(value, 0);
		this.data[method](...this.format(buf));
	}

	// write 4 byte, ex: 00 00 00 00
	WriteUInt32(value, method = "push") {
		const buf = Buffer.allocUnsafe(4);
		value === -1 && (value = 0xffffffff);
		buf.writeUInt32BE(value, 0);
		this.data[method](...this.format(buf));
	}

	// convert float to byte, 4 byte, ex: 00 00 00 00
	WriteFloat(value, method = "push") {
		const buf = Buffer.allocUnsafe(4);
		buf.writeFloatBE(value, 0);
		this.data[method](...this.format(buf));
	}
	
	// split octet into bytes
	WriteOctets(value = "") {
		if (value && value.match(/[0-9A-Fa-f]/g)) {
			value = value.match(/.{2}/g).map(e => '0x'+e);
			this.WriteCUInt32(value.length);
			this.data.push(...value);
		} else {
			this.WriteCUInt32(0);
		}
	}
	
	// convert string into bytes, ex: utf8 - 0a, utf16le - 00 0a
	WriteUString(value = "", coding = "utf16le") {
		if (!value) {
			return this.WriteUByte(0);
		}
		const buf = this.format(Buffer.from(value, coding));
		this.WriteCUInt32(buf.length);
		this.data.push(...buf);
	}
	
	// convert number ( could be 1, 2 or 4 byte) 
	WriteCUInt32(value, method = "push") {

		if (value <= 0x7F) { 
			return this.WriteUByte(value, method);
		} else if (value <= 0x3FFF) {
			return this.WriteUInt16(value + 0x8000, method);
		} else if ($value <= 0x1FFFFFFF) {
			return this.WriteUInt32(value + 0xC0000000, method);
		} else {
			return this.WriteUByte653(0xE0, method) || this.WriteUInt32(value, method);
		}
	}
	
	// insert opcode and length to the begining of data
	Pack(value) {
		const len = this.data.length;
		this.WriteCUInt32(len, "unshift");
		this.WriteCUInt32(value, "unshift");
	}

	// write array based on array scheme and data
	WriteArray(scheme, data) {
		// first we save the array length
		this.WriteCUInt32(data.length);
		for (const item of data) {
			for (const [name, type] of scheme) {
				// length used only for read
				if (name === "length") { continue; }
				this['Write'+type](item[name]);
			}
		}
	}
	
	// packall common data (few init data from protocol is exception)
	PackAll(scheme, data, protocol) {
		// we ignore the protocol from scheme, acctually it was used only for read
		const keys = Object.keys(scheme).shift();
		delete data.protocol;

		for (const category in scheme) {

			if (category === "protocol") { continue; }
			const fields = scheme[category];
			for (const [field, type] of fields) {
				const value = data[category][field];
				if (typeof type === "string") {
					this['Write'+type](value);
				} else {
					// type[1] is the scheme array for that array 
					this.WriteArray(type[1], value);
				}
			}
		}
		this.Pack(protocol);
		return this.Send();
	}

	// send data to server if we can, else add to queue list
	Send() {
		return new Promise((resolve, reject) => {
			this.client.write(Buffer.from(this.data), 'utf8');
			// callback when we get answer
			this.client.on('data', data => { 
				this.client.destroy(); 
				return resolve(data); 
			});
			// if error handler
			this.client.on('error', data => {
				this.client.destroy(); 
				return reject(err || 'Error: Cannot connect to server');
			});			
		});
	}
	
}

/* ReadPackets not done !!!! */
// 3203 1731
// 3200 1730
class ReadPacket {

	// create a bufer from data
	constructor(data = null) {
		this.buf = Buffer.from(data, 'binary');
        this.pos = 0;
	}
	
	ReadBytes(length) {
		const data = this.buf.toString('hex', this.pos, this.pos+length).match(/.{2}/g);
		this.pos += length;
		return data;
	}
	
	// read out a single byte and increase position by 1
	ReadUByte() {
		const data = this.buf.readUInt8(this.pos);
		this.pos++;
		return data;
	}
	
    ReadFloat() {
		const data = this.buf.readFloatBE(this.pos);
		this.pos += 4;
		
		return data.toFixed(4);;
	}

	// read out a unsigner integer (2byte) and increase position by 2 - big endian
	ReadUInt16() {
		const data = this.buf.readUInt16BE(this.pos);
		this.pos += 2;
		return data;
	}
	
	// read out a unsigner integer (4byte) and increase position by 4 - big endian
	ReadUInt32() {
		const data = this.buf.readUInt32BE(this.pos);
		this.pos += 4;
		return data;
	}
	
	// read out octets (first number is the length, then we extract string in hexdec form)
	ReadOctets() {
		const length = this.ReadCUInt32(),
			data = this.buf.toString('hex', this.pos, this.pos+length);
		this.pos += length;
		return data;
	}
	
	// read out utf16 string
	ReadUString() {
		const length = this.ReadCUInt32(),
			data = this.buf.toString('utf16le', this.pos, this.pos+length);
		this.pos += length;
		return data;
	}
	
	// read dynamic length data
	ReadCUInt32() {
		let value = this.ReadUByte();
		switch(value & 0xE0) {
			case 0xE0:
				value = this.ReadUInt32();
				break;
			case 0xC0:
				this.pos--;
				value = this.ReadUInt32() & 0x1FFFFFFF;
				break;
			case 0x80:
			case 0xA0:
				this.pos--;
				value = (this.ReadUInt16()) & 0x3FFF;
				break;
		}
		
		return value;
	}
	
	// read array based on scheme/structure
	ReadArray(scheme) {
		//since not exist reference value in array this cloning is enough
		const schemeClone = [...scheme];
		const length = this['Read'+schemeClone.shift()[1]]();
		const items = [];

		for(let i = 0; i < length; i++) {
			const item = schemeClone.reduce((item, [name, type]) => {
				item[name] = this['Read'+type]();
				return item;
			}, {});
			items.push(item);
		}	

		return items;		
	}	
		
	Seek(value) {
		this.pos += value;
	}
	
	UnpackAll(scheme, data = null) {
		const result = {};

		for (const keys in scheme) {
			result[keys] = {};
			const prop = result[keys];
			
				for (const [name, type] of scheme[keys]) {
					try {
						prop[name] = typeof type === "string" 
							? this[`Read${type}`]() 
							: this.ReadArray(type[1]);
					} catch (err) {
						return {
							error: err,
							key: keys,
							name: name
						}
					}
				}
			
		}
		return result;
	}
}


module.exports = { ReadPacket, WritePacket };