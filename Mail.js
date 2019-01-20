const { WritePacket } = require('./Packets.js');
const { sysMailScheme } = require('./schemes/mailScheme.js');

class MailSender {
	
	constructor(mailOptions = null, port = 29100) {
		
		this.data = {
			sysMsg: {
				tid: 344,
				sender_id: 32,
				sys_type: 3,
				target_id: 1024,
				title: "Test Title",
				message: "Test Message",
				item_id: 0,
				pos: 0,
				count: 0,
				max_count: 0,
				octet: "",
				proctype: 0,
				expire: 0,
				guid1: 0,
				guid2: 0,
				mask: 0,
				gold: 0
			}
		}
		mailOptions && this.update(mailOptions);
	}

	update(data) {
		Object.keys(data).forEach(e => this.data.sysMsg[e] = data[e] );
	}
	
	sendGold(gold) {
		const oldGold = this.data.sysMsg.gold;
		this.data.sysMsg.gold = gold;
		this.sendSysMail();
		this.data.sysMsg.gold = oldGold;
	}

	async sendSysMail() {
		const packet = new WritePacket(sysMailScheme);			
		const response = await packet.PackAll({sys: this.data.sysMsg});
		console.log(this.data.sysMsg.target_id, ' will reicive a sysMail!');
	}
}

module.exports = MailSender;