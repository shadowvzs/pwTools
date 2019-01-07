const { WritePacket, ReadPacket } = require('./Packets.js');

class UserRoles extends WritePacket {
	
	constructor(net, userOptions) {
		
		const callbacks = {
			success: data => this._extractUserRoles(data),
			error: _ => { throw 'Something went wrong during packet sending!' }
		}
		
		super(net, userOptions, callbacks);
		this.userId = userOptions.userId || 32;
	}
	
	_extractUserRoles(data) {
		console.log(data)
		const readPacket = new ReadPacket(data);
		readPacket.ReadPacketInfo();	  // opcode & length not used
		readPacket.ReadUInt32();		  // allways
		readPacket.ReadUInt32();		  // ret code
		const roleCount = readPacket.ReadCUInt32();   // char count
		const roles = [];
		let i = 0;
		for (; i < roleCount; i++) {
			roles[i] = {
				id: readPacket.ReadUInt32(),		// role id
				name: readPacket.ReadUString()      // role name
			};
		}
		this.resolve(roles);
	}
	
	send(resolve) {
		this.resolve = resolve;
		this._send();
	}
	
	_send() {
		this.data = [];
		this.WriteUInt32(-1); 							  		// allways
		this.WriteUInt32(this.userId)		  					// senderId
		this.Pack(0xD49);							  			// pack opcode and length
		this.SendPacket();										// send packets
	}
}

module.exports = UserRoles;