const userRoleList = [
	[ "count", "CUInt32" ],
	[ "id", "UInt32" ],
	[ "name", "UString" ]
];

const userRoleScheme = {
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
		
module.exports = {
	userRoleScheme: userRoleScheme
};