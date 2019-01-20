const territoryInfo = [
 		[ "length", "CUInt" ],
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
	protocol: {
               port: 29400,
               request: 0x035f,
               response: "835f"
	},		
	misc: [
		[ "ret_code", "UInt16" ],
	],
	list: [ "Array", territoryInfo ]
};

module.exports = { 
	territoriesScheme,
};