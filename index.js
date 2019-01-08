const { WritePacket, ReadPacket } = require('./Packets.js');



const UserRoles = require('./UserRoles.js');
const Role = require('./Role.js');


async function main(userId = 32) { 
	let userRoles = [], 
		roles = [];
	try {
		// list the roles from current user
		userRoles = await (new Promise( res => new UserRoles({userId}).send(res) ));
		// we send each promise async and if all done then continue (promise.all faster than await in loop )
		roles = await Promise.all(
			userRoles.map( role => (new Promise( res => new Role(res, role.id) )))
		);
		console.log(roles);
	} catch (err) {
		console.log(err,'error');
	}

}

main(32);

/*
const MailSender = require('./MailSender.js');

const v = new MailSender({ roleId: 1024 } );

v.send(1024, "my title", "this is a simple mail");

v.sendGold(1024, 2000, "my title", "this is a mail with 2k gold");

// send item too
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

v.update(newMailOptions);
v.send();

*/

/*

const ChatSender = require('./Chat.js');

const chat = new ChatSender(1024);
chat.sendMsg("test1");
chat.sendMsg("test2", 1);
chat.sendMsg("test3", 3, 1024);


*/