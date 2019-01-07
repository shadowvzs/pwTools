const net = require('net');

const { WritePacket, ReadPacket } = require('./Packets.js');



const UserRoles = require('./UserRoles.js');
const Role = require('./Role.js');

const userOptions = {
	host: '127.0.0.1',
	port: 29400,
	userId: 32
};

async function main() { 
	let roles = [], 
		rolesData = [];
	try {
		roles = await (new Promise( res => new UserRoles(net, userOptions).send(res) ));
		console.log('roles: ', roles)
		rolesData = Promise.all(
			roles.map( async role => { 
				return await (new Promise( res => new Role(net, userOptions).send(res, role.id) ))
			})
		);
	} catch (err) {
		console.log(err,'error');
	}

	console.log(roles)	
}

main();

//myPromise.then(console.log)

/*
const MailSender = require('./MailSender.js');

const mailOptions = {
	host: '127.0.0.1',
	port: 29100,
	roleId: 1024,
	msg: ""
};


const newMailOptions = {
	senderId: 32,
	targetId: 1024,
	title: "New Mail",
	msg: "We send an item with mail!",
	itemId: 25957,
	count: 1,
	maxCount: 1,
	octet: "0100db000300000003000000e8030000d00700002c00030c53006800610064006f00770000000000090000000d000000000000000f2700000f2700000000000000000000180000000000604000000000040000000000000000000000000000000000000002000000e34800009004000001000000bc460000840300000c000000",
	proctype: 19,
	expire: 0,
	guid1: 0,
	guid2: 0,
	mask: 1,
	gold: 3333
};


const v = new MailSender(net, mailOptions);

v.send(1024, "my title", "this is a simple mail");
v.sendGold(1024, 2000, "my title", "this is a mail with 2k gold");
// send item too
v.update(newMailOptions);
v.send();
*/

// --------- CHAT ----------

/*
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

/*

const ChatSender = require('./Chat.js');

const chatOptions = {
	host: '127.0.0.1',
	port: 29300,
	roleId: 1024,
	channelId: 9
}

const chat = new ChatSender(net, chatOptions);
chat.sendMsg("test1");
chat.sendMsg("test2", 1);
chat.sendMsg("test3", 3, 1024);


*/