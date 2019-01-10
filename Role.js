const { WritePacket, ReadPacket } = require('./Packets.js');
const roleScheme = require('./schemes/roleScheme.js');

class Role {
	
	constructor(roleId) {
		this.data = {};
		roleId && (this.roleId = roleId);
	}
	
	async reset() {
		const oldData = { ...(await this.load()) };
		const defRoleId = this.getDefaultRoleId(oldData.base.cls);
		const defaultRole = new Role(defRoleId);
		const data = await defaultRole.load();
		this.data.role = data;
		this.data.role.base.id = oldData.base.id;
		this.data.role.base.name = oldData.base.name;
		this.data.role.base.gender = oldData.base.gender;
		this.data.role.base.user_id = oldData.base.user_id;
		this.data.role.base.spouse = oldData.base.spouse;
		this.save();
		console.log('Role was resetted')
	}
	
	getDefaultRoleId(cls) {
		const defaultRoles = {
			0: 17,
			1: 16,
			3: 23,
			4: 24,
			6: 28,
			7: 31
		};	
		return defaultRoles[cls] || 0;
	}
	
	async delete(hard = false) {
		if (!this.roleId) { return; }
		console.log(this.roleId, ' delete request sent')
		if (hard) {
			const data = await this.load();
			data.base.status = 2;
			return this.save();
		}
		
		const packet = new WritePacket(29100);			
		packet.WriteUInt32(this.roleId)		  					// roleId
		packet.WriteUInt32(-1); 							  	// allways
		packet.Pack(0x56);							  		// pack opcode and length
		packet.Send();
		console.log(this.roleId, ' entered into deletion status');		
	}
	
	async save() {
		if (!this.data.role) { return console.log('Missing id or data!'); }
		const packet = new WritePacket(29400);			
		packet.WriteUInt32(-1); 							  	// allways
		packet.WriteUInt32(this.roleId)		  					// roleId
		packet.WriteUByte(1); 									// overwrite		
		packet.PackAll(roleScheme, this.data.role, 0x1F42);
		console.log(this.roleId, ' save request was sent')		
	}
	
	async load() {
		let role;
		const packet = new WritePacket(29400);			
		packet.WriteUInt32(-1); 							  	// allways
		packet.WriteUInt32(this.roleId)		  					// roleId
		packet.Pack(0x1F43);							  		// pack opcode and length
		role = (new ReadPacket(await packet.Send()))
							.UnpackAll(roleScheme);
		this.data.role = role;
		console.log(this.roleId, ' was loaded')		
		return role;
	}
	
}

module.exports = Role;