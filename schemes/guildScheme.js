const GuildListMembers = [
	[ "length", "CUInt32" ],
	[ "role_id", "UInt32" ],
	[ "cls", "UByte" ]
];

const GuildList = [
	[ "length", "UByte" ],
	[ "unknown1", "UInt32" ],
	[ "unknown2", "UByte" ],
	[ "unknown3", "UByte" ],
	[ "id", "UInt32" ],
	[ "name", "String" ],
	[ "level", "UByte" ],
	[ "master_id", "UInt32" ],
	[ "master_role", "UByte" ],
	[ "members", ["Array", GuildListMembers] ],
	[ "slogan", "String" ],
	[ "unknown4", "UByte" ],
];

const guildListScheme = {
	protocol: [
		[ "op_code", "CUInt32" ],
		[ "length", "CUInt32" ],
		[ "unknown1", "UInt32" ],
		[ "ret_code", "UInt32" ],
		
		//[ "unknown3", "UInt32" ],
		[ "unknown4", "UByte" ],
		
		//[ "unknown6", "UByte" ],
		
	],
	guilds: [ "Array", GuildList ]
};

module.exports = { 
	guildListScheme 
};