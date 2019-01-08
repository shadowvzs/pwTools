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

class chatSender extends WritePacket {
	
	constructor(roleId) {
		
		const callbacks = {
			success: _ => { console.log('All message sent'); this.Destroy(); },
			error: _ => { console.log('Sending error'); this.Destroy(); }
		}
		
		super(29300, callbacks);
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
	
	sendMsg(msg, channelId = null, roleId = null) {
		this.send(msg, channelId || this.channelId, roleId || this.roleId);
	}	
	
	send(msg, channelId, roleId) {
		this.data = [];
		this.WriteUByte(channelId);
		this.WriteUByte(this.emoticonId);
		this.WriteUInt32(roleId);
		this.WriteUString(msg);
		this.WriteOctets("");
		this.Pack(120);
		this.SendPacket();				
	}
}

module.exports = chatSender;