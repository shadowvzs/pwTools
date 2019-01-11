const fs = require('fs');
const { WritePacket, ReadPacket } = require('./Packets.js');

async function main(userId = 32) { 
	try {

		// list online players (user_id, role_id, name etc)
		// const GMComponent = require('./GM.js');
		// const GM = new GMComponent(1024);
		// const onlineList = await GM.getOnlineList();
		// console.log( onlineList );

		// list user roles
		// const UserComponent = require('./User.js');
		// const User = new UserComponent(32);
		// const roleList = await User.getRoleList();
		// console.log(roleList);
		// User.setGold(5000);
		
		const RoleComponent = require('./Role.js');
		const Role = new RoleComponent(1047);
		// ban this role
		// Role.ban();
		// time, type, reason. gm id (could be -1 too)
		// Role.ban(3600, 101, "Chat ban", 1024);
		
		// this example for load role data
		// or const role = await Role.load();
		//await Role.load();
		
		// this example for change user inventory gold then save
		//Role.data.role.inventory.gold = 8000;
		//Role.data.role.status.level = 6;
		// 6lv = 25 str 0 stat else crash - con int str agi hp mp 
/* 
19000000 con
05000000 int
05000000 str
05000000 agi
4b000000 hp
2d000000 mp
03000000 
02000000 
00000040 
0000a040 
00004040 
0000a040 
00000000 
01000000
01000000
10000000
00002040
00000000
00000000
00000000
00000000
00000000
00000000
00000000
00000000
00000000
00000000
01000000
01000000
00000000
00000000
00000000
00000000
00000000
01000000
00000000
00000000 - chi? 99/199/299/399 -  63000000/c7000000/2b010000/8f010000 
*/

/*
var_data 
int - ver
int - pk count
int - pvp cooldown
bool - pvp flag
char - dead flag
bool is drop
bool resurrect state
float resurrect exp reduce
instance hash key
int trashbox size
int last instance timestamp
int last instance tag
a3dvector last_instance_pos
int dir
float resurrect hp_factor
float resurrect mp_factor
*/

/*
Craft level 10 + city portal + initial skill
06000000
	a7000000 00000000 01000000 town portal
	a1000000 00000000 0a000000 craft skill
	a0000000 00000000 0a000000 craft skill
	9f000000 00000000 0a000000 craft skill
	9e000000 00000000 0a000000 craft skill
*/
		//Role.data.role.status.property = "190000000500000005000000050000004b0000002d0000000300000002000000000000400000a040000040400000a04000000000010000000100000010000000000020400000000000000000000000000000000000000000000000000000000000000000000000000000000001000000010000000000000000000000000000000000000000000000010000000000000000000000";

		//Role.save();
		
		// example for reset a role to clsconfig
		//await Role.reset();
		
		// example for instant delete role (without true will be 7 day delete)
		//await Role.delete(true);
		
		// if you want do more async action same time for an object then use promise all
		//await Promise.all([User.getRoleList()]);	
	} catch (err) {
		console.log(err, 'error');
	}

	/*

	// increase by 7777 each time
	Role.data.role.inventory.gold += 7777;
	Role.data.role.status.level = 70;
	Role.data.role.status.exp = 1000;	// must be below max exp per level
	Role.data.role.status.sp = 100000000;
	Role.data.role.status.pp = 70 * 5;		// state points cannot be higher than level * 5
							// con int str agi hp mp 
	Role.data.role.status.property = "ff000000ff000000ff000000ff0000004b0000002d0000000300000002000000000000400000a040000040400000a04000000000010000000100000010000000000020400000000000000000000000000000000000000000000000000000000000000000000000000000000001000000010000000000000000000000000000000000000000000000010000000000000000000000";
	Role.data.role.status.hp = 75; // this is the current hp! important, if max hp lower than this max hp applied
	Role.data.role.status.mp = 45; // this is the current mp! important, if max hp lower than this max mp applied
	Role.data.role.status.reputation = 200000;
	Role.save();
	*/
}

 main(32);

/*

const MailComponent = require('./Mail.js');
const Mail = new MailComponent({ target_id: 1030 } );

 Mail.sendSysMail();
 Mail.sendGold(2000);

// send item too
const newMailOptions = {
	sender_id: 32,
	target_id: 1030,
	title: "New Mail",
	message: "We send an item with mail!",
	item_id: 25957,
	count: 1,
	max_count: 1,
	octet: "0100db000300000003000000e8030000d00700002c00030c53006800610064006f00770000000000090000000d000000000000000f2700000f2700000000000000000000180000000000604000000000040000000000000000000000000000000000000002000000e34800009004000001000000bc460000840300000c000000",
	proctype: 19,
	expire: 0,
	guid1: 0,
	guid2: 0,
	mask: 1,
	gold: 3333
};
		
// could update 1 or more field, in this example we update most of fields 
// but this is optional, if you want then you can update only target_id or what you want		
Mail.update(newMailOptions);
Mail.sendSysMail();

*/


/*
const ChatComponent = require('./Chat.js');

const Chat = new ChatComponent(1047);
Chat.send("test1");
Chat.send("test2", 1);
Chat.send("test3", 3, 1047);

*/
