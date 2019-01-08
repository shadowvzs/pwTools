const { WritePacket, ReadPacket } = require('./Packets.js');
const roleScheme = require('./RoleStructure.js');

class Role extends WritePacket {
	
	constructor(net, userOptions) {
		
		const callbacks = {
			success: data => this._extractRole(data),
			error: _ => { throw 'Something went wrong during packet sending!' }
		}
		
		super(net, userOptions, callbacks);
	}
	
	_extractRole(data) {
		const role = {};
		const readPacket = new ReadPacket(data);
		this.readPacket = readPacket;
		readPacket.ReadPacketInfo();	  // opcode & length not used
		readPacket.ReadUInt32();		  // allways
		readPacket.ReadUInt32();		  // ret code
		
		for (const keys in roleScheme) {
			
			role[keys] = {};
			const roleCat = role[keys];

			for (const [name, type] of roleScheme[keys]) {
				if (typeof type === "string") {
					roleCat[name] = readPacket[`Read${type}`]();
				} else {
					let [subName, subScheme, dLen = null] = type;
					if (dLen && typeof dLen === "object" && dLen.length) {
						dLen = dLen.reduce((obj, e) => obj[e]);
					}
					
					roleCat[name] = this['read'+subName](subScheme, dLen);
				}
			}
		}
		console.log(role.base);
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