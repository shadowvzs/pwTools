const userRoleList = [
	[ "count", "CUInt32" ],
	[ "id", "UInt32" ],
	[ "name", "String" ]
];

const userRoleListScheme = {
	protocol: [
		[ "op_code", "CUInt32" ],
		[ "length", "CUInt32" ],
		[ "unknown1", "UInt32" ],
		[ "ret_code", "UInt32" ],
	],
	base: [
		[ "roles", [ "Array", userRoleList ] ]
	]
};


const exp_log = [
	[ "length", "CUInt32" ],
	[ "tid", "UInt32" ],
	[ "time", "UInt32" ],
	[ "result", "UByte" ],
	[ "volume", "UByte" ],
	[ "cost", "UInt32" ]
];

const autolock = [
	[ "length", "CUInt32" ],
	[ "key", "UInt32" ],
	[ "value", "UInt32" ],
];

const forbidden = [
	[ "length", "CUInt32" ],
	[ "type", "UByte" ],
	[ "time", "UInt32" ],
	[ "created_time", "UInt32" ],
	[ "reason", "UString" ],
];


const userInfoScheme = {
	protocol: [
		[ "op_code", "CUInt32" ],
		[ "length", "CUInt32" ],
		[ "unknown", "UInt32" ],
		[ "ret_code", "UInt32" ],

	],
	info: [
		[ "role_id", "UInt32" ],		// rolessstart with this id (ex. 1024)
		[ "logicuid", "UInt32" ],
		[ "cash", "UInt32" ],			// in mysql?
		[ "money", "UInt32" ],          // ????
		[ "cash_add", "UInt32" ],		// cubi gold/cash added to account
		[ "cash_buy", "UInt32" ],		// cash bought from auction hall
		[ "cash_sell", "UInt32" ],		// cash sold in auction hall
		[ "cash_used", "UInt32" ],		// cubi gold/cash spent
		[ "add_serial", "UInt32" ],
		[ "use_serial", "UInt32" ],
		[ "exp_log", ["Array", exp_log] ],
		[ "addiction", "Octets" ],
		[ "cash_password", "Octets" ],
		[ "autolock", ["Array", exp_log] ],
		[ "status", "UByte" ],
		[ "forbidden", ["Array", forbidden] ],		
		[ "reference", "Octets" ],
		[ "consume_reward", "Octets" ],
		[ "task_counter", "Octets" ],
		[ "cash_sysauction", "Octets" ],
		[ "login_record", "Octets" ],
		[ "mall_consumption", "Octets" ],

	]
};
		
module.exports = {
	userRoleListScheme,
	userInfoScheme
};