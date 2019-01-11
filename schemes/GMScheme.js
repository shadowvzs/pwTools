const role_info = [
	[ "count", "CUInt32" ],
	[ "user_id", "UInt32" ],
	[ "role_id", "UInt32" ],
	[ "link_id", "UInt32" ],
	[ "local_sid", "UInt32" ],
	[ "gs_id", "UInt32" ],
	[ "status", "UByte" ],
	[ "name", "String" ]
];		

const onlineListScheme = {
	protocol: [
		[ "op_code", "CUInt32" ],	// 132 - 0xC0
		[ "length", "CUInt32" ],	// 9   - 0x09
		[ "unknown1", "UInt32" ],	// 3489660928 - 0xd0000000
		[ "ret_code", "UInt32" ],	// 0
		[ "unknown2", "UInt32" ], 	// 8423425 = 0x808801
		[ "unknown3", "UInt32" ],	// 8479067 = 0x81615B
		[ "unknown4", "UInt32" ],	// 0
	],
	base: [
		[ "localsid", "UInt32" ],	// 1
		[ "gm_role_id", "UInt32" ],	// correct
		[ "unknown5", "UInt32" ],	// 4294967295 = 0xFFFFFFFF
		[ "online_list", ["Array", role_info] ],
	]
}	
		
module.exports = { 
	onlineListScheme 
};