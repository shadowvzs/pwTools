const fs = require('fs');
const { WritePacket, ReadPacket } = require('./Packets.js');

async function main(userId = 32) { 
	try {

		// list all territory land with their infos like color, owner, attack time, level
		// const TerritoryComponent = require('./Territory.js');
		// const TW = new TerritoryComponent();
		// const TWList = await TW.getList();
		// console.log( TWList );

		// NOTE: Do note replace guild master if you don't know how to do it!!
		// first candidate must be guild master and only after that need downgrade the old guild master!
		// also players must login for refresh the guild list
		 //const GuildComponent = require('./Guild.js');
		 //const Guild = new GuildComponent(5);
		 //const guildLists = await Guild.delete(); 			// list every guild
		 //console.log(guildLists);
		// const guildLists = await Guild.getAll(); 			// list every guild
		// console.log(guildLists);
		// const guildInfo = await Guild.load();				// list the current guild
		// console.log(guildInfo);
		// set role 1029 to guild master poisition in faction id 5
		// await Guild.setRoleRank(1040, 2);				// change guild member rank
		
		 //list online players (user_id, role_id, name etc)
		 //const GMComponent = require('./GM.js');
		 //const GM = new GMComponent(1024);
		 //const onlineList = await GM.getOnlineList();
		 //console.log( onlineList );
		 //const ban = await GM.ban(1040);
		 //console.log( ban );

		// list user roles, set user gold, get user info
		// const UserComponent = require('./User.js');
		// const User = new UserComponent(32);
		// const roleList = await User.getRoleList();
		// console.log(roleList);
		// User.setGold(5000);
		// const userInfo = await User.getInfo();
		// console.log(userInfo);
		
		// const RoleComponent = require('./Role.js');
		//  const Role = new RoleComponent(1040);
		
		// get which guild is this role (get guild id, title and rank in guild)
		// const roleGuild = await Role.getGuild();
		// console.log(roleGuild);

		// get role id
		// const id = await Role.getId("pista20");
		// console.log(id);
		
		// ban this role
		// Role.ban();
		// time, type, reason. gm id (could be -1 too)
		// Role.ban(3600, 101, "Chat ban", 1024);
		
		// rename role - user must be logged out
		// Role.rename("pista20");
		
		// this example for load & save role data
		// const role = await Role.load(); // or just await Role.load(); then data will be in Role.data.role.base
		// console.log(role)
		// this example for change user inventory gold then save
		// Role.data.role.inventory.gold = 10000000;
		// Role.data.role.status.level = 50;
		// Role.data.role.status.pp = 250;
		// 6lv = 25 str 0 stat else crash - con int str agi hp mp 
		//Role.data.role.status.property = "190000000500000005000000050000004b0000002d0000000300000002000000000000400000a040000040400000a04000000000010000000100000010000000000020400000000000000000000000000000000000000000000000000000000000000000000000000000000001000000010000000000000000000000000000000000000000000000010000000000000000000000";
		// Role.save();
		
		// example for reset a role to clsconfig
		//await Role.reset();
		
		// example for instant delete role (without true will be 7 day delete)
		//await Role.delete(true);
		
		// if you want do more async action same time for an object then use promise all
		//await Promise.all([User.getRoleList()]);	
		
		
		/*		
		const MailComponent = require('./Mail.js');
		const Mail = new MailComponent({ target_id: 1047 } );

		 Mail.sendSysMail();
		 
		 Mail.sendGold(2000);

		// send item too
		const newMailOptions = {
			sender_id: 32,
			target_id: 1047,
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
		

		
	} catch (err) {
		console.log(err, 'Sorry but but something went wrong... ');
	}
	
}

 main(32);




