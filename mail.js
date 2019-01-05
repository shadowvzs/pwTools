const { WritePacket } = require('./packet.js');

class mailSender extends WritePacket {
	
	constructor(net, mailOptions) {
		
		const callbacks = {
			success: _ => console.log('Every mail sent'),
			error: _ => console.log('Sending error')
		}
		
		super(net, mailOptions, callbacks);
		this.senderId = 32;
		this.targetId = 1024;
		this.title = "Test Title"
		this.msg = "Test Message";
		this.itemId = 0;
		this.count = 0;
		this.maxCount = 0;
		this.octet = ""
		this.proctype = 0
		this.expire = 0;
		this.guid1 = 0;
		this.guid2 = 0;
		this.mask = 0;
		this.gold = 0;
		this.update(mailOptions);

	}

	update(data) {
		Object.keys(data).forEach(e => this[e] && (this[e] = data[e]) );
	}
	
	sendGold(targetId, gold, title, msg) {
		const oldGold = this.gold;
		this.gold = gold;
		this.send(targetId, title, msg);
		this.gold = oldGold;
	}

	send(targetId = null, title = "", msg = "") {
		// targetId, title, msg, itemId, pos, count, maxCount, 
		// octets, proctype, expireDate, guid1, guid2, mask, gold
		this.data = [];
		this.WriteUInt32(344); 							  		  // t.id
		this.WriteUInt32(this.senderId); 						  // senderId
		this.WriteUByte(3); 							  		  // sys.type
		this.WriteUInt32(targetId || this.targetId); 			  // target.roleId
		this.WriteUString(title || this.title);					  // title.length && title
		this.WriteUString(msg || this.msg);						  // msg.length && msg
		this.WriteUInt32(this.itemId);						  	  // itemId
		this.WriteUInt32(0); 							  		  // pos
		this.WriteUInt32(this.count);						  	  // count
		this.WriteUInt32(this.maxCount);						  // maxCount
		this.WriteOctets(this.octet);						  	  // item octet
		this.WriteUInt32(this.proctype);						  // proctype
		this.WriteUInt32(this.expireDate);					  	  // expire timestamp
		this.WriteUInt32(this.guid1);						  	  // guid1
		this.WriteUInt32(this.guid2);						  	  // guid2
		this.WriteUInt32(this.mask);						  	  // mask
		this.WriteUInt32(this.gold);						      // gold
		this.Pack([144, 118]);							  		  // pack opcode and length
		this.SendPacket();	
		console.log(this.data.join('-'));
			
	}
}

module.exports = mailSender;