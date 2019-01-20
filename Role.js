const { WritePacket, ReadPacket } = require('./Packets.js');
const { 
	putRoleScheme, 
	getRoleScheme, 
	roleGuildScheme, 
	getIdScheme 
} = require('./schemes/roleScheme.js');

class Role {
	
	constructor(roleId) {
		this.data = {};
		roleId && (this.roleId = roleId);
	}
	
	async getId(name) {
		const packet = new WritePacket(getIdScheme);
		packet.WriteUInt32(-1);							// localsid		
		packet.WriteString(name);						// role name			
		packet.WriteUByte(0);							// unknown			
		packet.Pack(0x0bd9);		
		const role_id = (await packet.Request()).base.role_id;
		return (role_id > 0 && role_id < 0x7fffffff) ? role_id : false;		
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
	
	async getGuild(roleId = null) {
		let guild;
		if (!this.roleId) { return console.log('Role id missing'); }
		const packet = new WritePacket(roleGuildScheme);
		packet.WriteUInt32(-1);							// localsid			
		packet.WriteUInt32(1);							// unknown			
		packet.WriteUInt32(this.roleId);					// role id	
		packet.Pack(0x11ff);		
		this.data.guild = (await packet.Request()).details;
		return this.data.guild;
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
		packet.WriteUInt32(this.roleId)		  				// roleId
		packet.WriteUInt32(-1); 							  	// allways
		packet.Pack(0x56);							  		// pack opcode and length
		packet.Send();
		console.log(this.roleId, ' entered into deletion status');		
	}
	
	async save() {
		if (!this.data.role) { return console.log('Missing id or data!'); }
		const packet = new WritePacket(putRoleScheme);			
		packet.WriteUInt32(-1); 							  	// allways
		packet.WriteUInt32(this.roleId)		  				// roleId
		packet.WriteUByte(1); 								// overwrite		
		packet.PackAll(this.data.role);
		console.log(this.roleId, ' save request was sent')		
	}
	
	async ban(duration = 3600, banType = 100, reason = "", bannerGM = -1) {
		//ban types: 100-role, 101-chat,102-?,103-?
		const packet = new WritePacket(29100);			
		packet.WriteUByte(banType); 
		packet.WriteUInt32(bannerGM)		  			// gm id
		packet.WriteUInt32(0); 							// localsid
		packet.WriteUInt32(this.roleId); 					// target id
		packet.WriteUInt32(duration); 					// time
		packet.WriteString(reason); 						// allways
		packet.Pack(0x16E);							  	// pack opcode and length
		return await packet.Send();		
	}
	
	async rename(newName) {
		let role;
		if (!this.roleId) { return console.log('Role id missing'); }
		if (!this.data.base) { await this.load(); }
		const packet = new WritePacket(29400);			
		packet.WriteUInt32(-1); 							// allways
		packet.WriteUInt32(this.roleId)		  			// roleId
		packet.WriteString(this.data.role.base.name);		// old name	
		console.log('name', this.data.role.base.name)
		packet.WriteString(newName);					// new name
		packet.Pack(0xd4c);							// pack opcode and length
		return await packet.Send();
	}
	
	async load(id = null) {
		id && (this.roleId = id);
		let role;
		const packet = new WritePacket(getRoleScheme);			
		packet.WriteUInt32(-1); 							  		// allways
		packet.WriteUInt32(this.roleId)		  					// roleId
		packet.Pack(0x1F43);							  		// pack opcode and length
		role = await packet.Request();
		this.data.role = role;
		console.log(this.roleId, ' was loaded')		
		return role;
	}
	
}

module.exports = Role;