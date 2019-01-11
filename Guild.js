const { WritePacket, ReadPacket } = require('./Packets.js');
const { guildListScheme } = require('./schemes/guildScheme.js');

class Guild {
	
	constructor(id = null) {
		this.data = {};
		id && (this.id = id);
	}
	
	async getGuilds() {
		const packet = new WritePacket(29400);			
		packet.WriteUInt32(-1); 						// unknown
		packet.WriteUByte(0x80); 						// unknown
		packet.WriteString("factioninfo", 'utf8');		// table name
		packet.WriteUInt32(0); 							// unknown
		packet.Pack(0xbef);							  	// pack opcode and length
		const response = await packet.Send();			// get raw data
		this.data.list = (new ReadPacket(response)).UnpackAll(guildListScheme);
		return this.data.list;
	}
	
}

module.exports = Guild;