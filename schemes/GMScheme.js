const role_info = [
	[ "count", "CUInt" ],
	[ "user_id", "UInt32" ],
	[ "role_id", "UInt32" ],
	[ "link_id", "UInt32" ],
	[ "local_sid", "UInt32" ],
	[ "gs_id", "UInt32" ],
	[ "status", "UByte" ],
	[ "name", "String" ]
];		

const onlineListScheme = {
	protocol: {
               port: 29100,
               request: 0x1076,
               response: "8161"
	},	
	base: [
		[ "localsid", "UInt32" ],		// it is allways 1
		[ "gm_role_id", "UInt32" ],	// 4294967295 = 0xFFFFFFFF
		[ "unknown4", "UInt32" ],	// 4294967295 = 0xFFFFFFFF
		[ "online_list", ["Array", role_info] ],
	]
}	
		
module.exports = { 
	onlineListScheme 
};