const territoryInfo = [
 		[ "length", "CUInt32" ],
 		[ "id", "UInt16" ],
		[ "level", "UInt16" ],
		[ "owner", "UInt32" ],
		[ "occupy_time", "UInt32" ],
		[ "challenger", "UInt32" ],
		[ "deposit", "UInt32" ],
		[ "cutoff_time", "UInt32" ],
		[ "battle_time", "UInt32" ],
		[ "bonus_time", "UInt32" ],
		[ "color", "UInt32" ],
		[ "status", "UInt32" ],
		[ "timeout", "UInt32" ],
		[ "max_bonus", "UInt32" ],
		[ "unknown1", "UInt32" ],
		[ "unknown2", "UInt32" ]
]

const territoriesScheme = {
	protocol: [
		[ "op_code", "CUInt32" ],
		[ "length", "CUInt32" ],
		[ "unknown", "UInt32" ],
		[ "ret_code", "UInt16" ],
	],
	list: [ "Array", territoryInfo ]
};

module.exports = { 
	territoriesScheme,
};