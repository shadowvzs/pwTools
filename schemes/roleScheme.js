const itemScheme = [
	[ "length", "CUInt32" ],
	[ "id", "UInt32" ],
	[ "pos", "UInt32" ],
	[ "count", "UInt32" ],
	[ "max_count", "UInt32" ],
	[ "data", "Octets" ],
	[ "proctype", "UInt32" ],
	[ "expire_date", "UInt32" ],
	[ "guid1", "UInt32" ],
	[ "guid2", "UInt32" ],
	[ "mask", "UInt32" ]			
];

const forbiddenScheme = [
	[ "length", "CUInt32" ],
	[ "type", "UByte" ],
	[ "time", "UInt32" ],
	[ "create_time", "UInt32" ],
	[ "reason", "String" ]
];

const roleScheme = {
	protocol: [
		[ "op_code", "CUInt32" ],
		[ "length", "CUInt32" ],
		[ "unknown1", "UInt32" ],
		[ "ret_code", "UInt32" ],
	],
	base: [
		[ "version", "UByte" ],
		[ "id", "UInt32" ],
		[ "name", "String" ],
		[ "race", "UInt32" ],
		[ "cls", "UInt32" ],
		[ "gender", "UByte" ],
		[ "custom_data", "Octets" ],
		[ "config_data", "Octets" ],
		[ "custom_stamp", "UInt32" ],
		[ "status", "UByte" ],
		[ "delete_time", "UInt32" ],
		[ "create_time", "UInt32" ],
		[ "lastlogin_time", "UInt32" ],
		[ "forbidden", ["Array", forbiddenScheme] ],
		[ "help_states", "Octets" ],
		[ "spouse", "UInt32" ],
		[ "user_id", "UInt32" ],
		[ "cross_data", "Octets" ],
		[ "reserved2", "UByte" ],
		[ "reserved3", "UByte" ],
		[ "reserved4", "UByte" ]
	],
	status: [
		[ "version", "CUInt32" ],
		[ "level", "UInt32" ],
		[ "culti", "UInt32" ],
		[ "exp", "UInt32" ],
		[ "sp", "UInt32" ],
		[ "pp", "UInt32" ],
		[ "hp", "UInt32" ],
		[ "mp", "UInt32" ],
		[ "pos_x", "Float" ],
		[ "pos_y", "Float" ],
		[ "pos_z", "Float" ],
		[ "map", "UInt32" ],
		[ "pk_status", "UInt32" ],
		[ "pk_time", "UInt32" ],
		[ "hero_time", "UInt32" ],
		[ "reputation", "UInt32" ],
		[ "custom_status", "Octets" ],
		[ "filter_data", "Octets" ],
		[ "charactermode", "Octets" ],
		[ "instancekeylist", "Octets" ],
		[ "dbltime_expire", "UInt32" ],
		[ "dbltime_mode", "UInt32" ],
		[ "dbltime_begin", "UInt32" ],
		[ "dbltime_used", "UInt32" ],
		[ "dbltime_max", "UInt32" ],
		[ "time_used", "UInt32" ],
		[ "dbltime_data", "Octets" ],
		[ "storesize", "UInt16" ],
		[ "petcorral", "Octets" ],
		[ "property", "Octets" ],
		[ "var_data", "Octets" ],
		[ "skills", "Octets" ],
		[ "storehousepasswd", "Octets" ],
		[ "waypointlist", "Octets" ],
		[ "coolingtime", "Octets" ],
		[ "npc_relation", "Octets" ],
		[ "multi_exp_ctrl", "Octets" ],
		[ "storage_task", "Octets" ],
		[ "guild_contrib", "Octets" ],
		[ "force_data", "Octets" ],
		[ "online_award", "Octets" ],
		[ "profit_time_data", "Octets" ],
		[ "country_data", "Octets" ],
		// [ if version is 1.5.1+ then v80+
		// [ king_data", "Octets" ],
		// [ meridian_data", "Octets" ],
		// [ extraprop", "Octets" ],
		// [ title_data", "Octets" ],
		// [ reincarnation_data", "Octets" ],
		// [ realm_data", "Octets" ],
		[ "reserved4", "UInt32" ],
		[ "reserved5", "UInt32" ],
	],
	inventory: [
		[ "capacity", "UInt32" ],
		[ "timestamp", "UInt32" ],
		[ "gold", "UInt32" ],
		[ "items", ["Array", itemScheme, ['inventory', 'capacity']] ],
		[ "reserved1", "UInt32" ],
		[ "reserved2", "UInt32" ],				
	],
	equipments: [
		[ "items", ["Array", itemScheme] ]
	],
	banker: [
		[ "capacity", "UInt32" ],
		[ "gold", "UInt32" ],
		[ "items", ["Array", itemScheme ] ],
		[ "materials_capacity", "CUInt32"],
		[ "fashion_capacity", "CUInt32"],
		[ "materials", ["Array", itemScheme ] ],
		[ "fashions", ["Array", itemScheme ] ],
		// if version is 1.5.1+ then
		// cards: [
		//		[ "cardCap", "UByte" ],
		// 		[ "items": ["Array", itemScheme] ]
		// ]
	],
	tasks: [
		[ "reserved", "UInt32" ],
		[ "task_data", "Octets" ],
		[ "task_complete", "Octets" ],
		[ "task_finishtime", "Octets" ],
		[ "items", ["Array", itemScheme] ]
	]
};

const roleGuild = {
	protocol: [
		[ "op_code", "CUInt32" ],
		[ "length", "CUInt32" ],
		[ "unknown", "UInt32" ],
		[ "ret_code", "UInt32" ],
	],
	details: [
		[ "role_id", "UInt32" ],
		[ "name", "String" ],
		[ "guild_id", "UInt32" ],
		[ "cls", "UByte" ],
		[ "rank", "UByte" ],
		[ "unknown", "UByte" ],
		[ "extend", "Octets" ],
		[ "title", "String" ],
	]
};
		
module.exports = {
	roleScheme, 
	roleGuild
};