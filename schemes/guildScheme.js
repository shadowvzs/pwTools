const guildListMembers = [
	[ "length", "CUInt32" ],
	[ "role_id", "UInt32" ],
	[ "cls", "UByte" ]
];

const guildList = [
	[ "length", "UByte" ],
	[ "unknown1", "UInt32" ],
	[ "unknown2", "UByte" ],
	[ "unknown3", "UByte" ],
	[ "id", "UInt32" ],
	[ "name", "String" ],
	[ "level", "UByte" ],
	[ "master_id", "UInt32" ],
	[ "master_role", "UByte" ],
	[ "members", ["Array", guildListMembers] ],
	[ "slogan", "String" ],
	[ "unknown4", "UByte" ],
];

const guildListScheme = {
	protocol: [
		[ "op_code", "CUInt32" ],
		[ "length", "CUInt32" ],
		[ "unknown1", "UInt32" ],
		[ "ret_code", "UInt32" ],
		[ "unknown4", "UByte" ],
	],
	guilds: [ "Array", guildList ]
};


const guildInfoMembers = [
	[ "length", "CUInt32" ],
	[ "role_id", "UInt32" ],
	[ "level", "UByte" ],
	[ "rank", "UByte" ],
	[ "login_day", "UByte" ],
	[ "unknown1", "UByte" ],
	[ "unknown2", "UByte" ],
	[ "unknown3", "UByte" ],
	[ "name", "String" ],
	[ "title", "String" ],
];

const guildInfoScheme = {
	protocol: [
		[ "op_code", "CUInt32" ],
		[ "length", "CUInt32" ],
		[ "unknown", "UInt32" ],
		[ "ret_code", "UInt32" ],

	],
	info: [
		[ "id", "UInt32" ],
		[ "name", "String" ],
		[ "level", "UByte" ],
		[ "master_id", "UInt32" ],
		[ "slogan", "String" ],
		[ "unknown", "UByte" ],
		[ "members", ["Array", guildInfoMembers] ],
	]
};

module.exports = { 
	guildListScheme,
	guildInfoScheme
};