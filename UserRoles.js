const { WritePacket, ReadPacket } = require('./Packets.js');
const { userRoleScheme } = require('./schemes/userScheme.js');

class UserRoles extends WritePacket {
	
	constructor(userOptions) {
		
		const callbacks = {
			success: data => this._extractUserRoles(data),
			error: _ => { throw 'Something went wrong during packet sending!' }
		}
		
		super(29400, callbacks);
		this.userId = userOptions.userId || 32;
	}
	
	_extractUserRoles(data) {
		const user = (new ReadPacket(data)).Unpack(userRoleScheme);
		if (!user.error) {
			this.resolve(user.base.roles.items);
		} else {
			// we have a nice error here
		}
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