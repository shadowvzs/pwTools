const { WritePacket, ReadPacket } = require('./Packets.js');
const { territoriesScheme } = require('./schemes/territoryScheme.js');

class Territory {
	
	constructor(id = null) {
		this.data = {};
		id && (this.id = id);
	}
	
	async getList() {
		const packet = new WritePacket(territoriesScheme);
		packet.WriteUInt32(-1);							// localsid			
		packet.WriteUInt32(1);							// unknown		
		packet.Pack(0x35f);		
		this.data.list = (await packet.Request());
		return this.data.list;
	}
	
}

module.exports = Territory;