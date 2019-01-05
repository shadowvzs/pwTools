const { WritePacket } = require('./packet.js');

class chatSender extends WritePacket {
	
	constructor(net, chatOptions) {
		
		const callbacks = {
			success: _ => { console.log('All message sent'); this.Destroy(); },
			error: _ => { console.log('Sending error'); this.Destroy(); }
		}
		
		super(net, chatOptions, callbacks);
		this.channelId = chatOptions.channelId || 9;
		this.roleId = chatOptions.roleId || 0;
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