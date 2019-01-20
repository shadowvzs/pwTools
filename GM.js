const { WritePacket, ReadPacket } = require('./Packets.js');
const { onlineListScheme } = require('./schemes/GMScheme.js');

class GM {
	
	constructor(roleId) {
		this.data = {};
		this.roleId = roleId || -1;
	}
	
	async ban(target_id, duration = 3600, banType = 100, reason = "", bannerGM = -1) {
		//ban types: 100-role, 101-chat,102-?,103-?
		const packet = new WritePacket(29100);			
		packet.WriteUByte(banType); 
		packet.WriteUInt32(this.roleId)		  			// gm id
		packet.WriteUInt32(0); 							// localsid
		packet.WriteUInt32(target_id); 					// target id
		packet.WriteUInt32(duration); 					// time
		packet.WriteString(reason); 						// allways
		packet.Pack(0x16E);							// pack opcode and length
		packet.Send();		
	}
	
	async getOnlineList() {
		const packet = new WritePacket(onlineListScheme);	
		packet.WriteUInt32(-1); 				// localsid
		packet.WriteUInt32(this.roleId);		// gm_role_id
		packet.WriteUInt32(1); 				// source ?
		packet.WriteOctets("31"); 			// idk ?
		packet.Pack(0x160);				// pack opcode and length		
		this.data.onlineList = (await packet.Request()).base;
		return this.data.onlineList;
	}
	
}

module.exports = GM;