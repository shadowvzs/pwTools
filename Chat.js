const { WritePacket } = require('./Packets.js');

/*
	Channels:
		0 - Normal white
		1 - World yellow
		2 - Party
		3 - Guild
		4 - ??? Blue
		6 - ??? Orange
		7 - Trade
		9 - System red
		10 - ??? Blue
		12 - Horn
*/

class Chat {
	
	constructor(roleId) {
		this.channelId = 9;
		this.roleId = roleId || 0;
		this.emoticonId = 0;
	}
	
	setChannel(id) {
		this.channelId = id;
	}

	setRoleId(id) {
		this.roleId = id;
	}
	
	send(msg, channelId, roleId) {
		const packet = new WritePacket(29300);			
		packet.WriteUByte(channelId || this.channelId)		// roleId
		packet.WriteUByte(this.emoticonId)		  			// roleId
		packet.WriteUInt32(roleId || this.roleId)		  	// roleId
		packet.WriteString(msg)		  					// roleId
		packet.WriteOctets(""); 							// allways
		packet.Pack(0x78);							  		// pack opcode and length
		packet.Send();
		console.log(this.roleId, ' send '+msg);	
	}
}

module.exports = Chat;