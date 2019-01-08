const { WritePacket, ReadPacket } = require('./Packets.js');
const roleScheme = require('./schemes/roleScheme.js');

class Role extends WritePacket {
	
	constructor(resolve = null, roleId = null) {
		
		const callbacks = {
			success: data => this._extractRole(data),
			error: _ => { throw 'Something went wrong during packet sending!' }
		}
		
		super(29400, callbacks);
		
		(resolve && roleId) && (this.load(resolve, roleId));
	}
	
	_extractRole(data) {
		const role = (new ReadPacket(data)).Unpack(roleScheme);
		if (!role.error) {
			console.log('success, this is the user data');
			return this.resolve(role);
		} else {
			// we have an error :)
		}
	}
	
	load(resolve, roleId) {
		this.resolve = resolve;
		this.data = [];
		this.WriteUInt32(-1); 							  		// allways
		this.WriteUInt32(roleId)			  					// senderId
		this.Pack(0x1F43);							  			// pack opcode and length
		this.SendPacket();										// send packets
	}
	
}

module.exports = Role;