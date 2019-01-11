const sysMailScheme = {
	protocol: [
		[ "op_code", "CUInt32" ],
		[ "length", "CUInt32" ],
		[ "unknown1", "UInt32" ],
		[ "ret_code", "UInt32" ],
	],
	sys: [
		[ "tid", "UInt32" ],
		[ "sender_id", "UInt32" ],
		[ "sys_type", "UByte" ],
		[ "target_id", "UInt32" ],
		[ "title", "String" ],
		[ "message", "String" ],
		[ "item_id", "UInt32" ],
		[ "pos", "UInt32" ],
		[ "count", "UInt32" ],
		[ "max_count", "UInt32" ],
		[ "octet", "Octets" ],
		[ "proctype", "UInt32" ],
		[ "expire", "UInt32" ],
		[ "guid1", "UInt32" ],
		[ "guid2", "UInt32" ],
		[ "mask", "UInt32" ],
		[ "gold", "UInt32" ],
	]
};
		
module.exports = {
	sysMailScheme: sysMailScheme
};