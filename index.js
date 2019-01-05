const net = require('net');

const mailSender = require('./mail.js');

const mailOptions = {
	host: '127.0.0.1',
	port: 29100,
	roleId: 1024,
	msg: ""
}


const v = new mailSender(net, mailOptions);
v.send(1024, "my title", "this is a simple mail");
v.sendGold(1024, 2000, "my title", "this is a mail with 2k gold");


const chatSender = require('./chat.js');

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

const chatOptions = {
	host: '127.0.0.1',
	port: 29300,
	roleId: 1024,
	channelId: 9
}

const chat = new chatSender(net, chatOptions);
//chat.sendMsg("test1");
//chat.sendMsg("test2", 1);
//chat.sendMsg("test3", 3, 1024);


