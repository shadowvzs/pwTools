const { WritePacket, ReadPacket } = require('./Packets.js');

class Role extends WritePacket {
	
	constructor(net, userOptions) {
		
		const callbacks = {
			success: data => this._extractRole(data),
			error: _ => { throw 'Something went wrong during packet sending!' }
		}
		
		super(net, userOptions, callbacks);
	}
	
	_extractRole(data) {
		console.log(data)
		const readPacket = new ReadPacket(data);
		this.readPacket = readPacket;
		readPacket.ReadPacketInfo();	  // opcode & length not used
		readPacket.ReadUInt32();		  // allways
		readPacket.ReadUInt32();		  // ret code
		
		const role = {
			base: {
				version: readPacket.ReadUByte(),
				id: readPacket.ReadUInt32(),
				name: readPacket.ReadUString(),
				race: readPacket.ReadUInt32(),
				class: readPacket.ReadUInt32(),
				gender: readPacket.ReadUByte(),
				custom_data: readPacket.ReadOctets(),
				config_data: readPacket.ReadOctets(),
				custom_stamp: readPacket.ReadUInt32(),
				status: readPacket.ReadUByte(),
				delete_time: readPacket.ReadUInt32(),
				create_time: readPacket.ReadUInt32(),
				lastlogin_time: readPacket.ReadUInt32(),
				forbidden: this._forbidden(),
				help_states: readPacket.ReadOctets(),
				spouse: readPacket.ReadUInt32(),
				user_id: readPacket.ReadUInt32(),
				cross_data: readPacket.ReadOctets(),
				reserved2: readPacket.ReadUByte(),
				reserved3: readPacket.ReadUByte(),
				reserved4: readPacket.ReadUByte()
			},
			status: {
				version: readPacket.ReadCUInt32(),
				level: readPacket.ReadUInt32(),
				culti: readPacket.ReadUInt32(),
				exp: readPacket.ReadUInt32(),
				sp: readPacket.ReadUInt32(),
				pp: readPacket.ReadUInt32(),
				hp: readPacket.ReadUInt32(),
				mp: readPacket.ReadUInt32(),
				pos_x: readPacket.ReadFloat(),
				pos_y: readPacket.ReadFloat(),
				pos_z: readPacket.ReadFloat(),
				map: readPacket.ReadUInt32(),
				pk_status: readPacket.ReadUInt32(),
				pk_time: readPacket.ReadUInt32(),
				hero_time: readPacket.ReadUInt32(),
				reputation: readPacket.ReadUInt32(),
				custom_status: readPacket.ReadOctets(),
				filter_data: readPacket.ReadOctets(),
				charactermode: readPacket.ReadOctets(),
				instancekeylist: readPacket.ReadOctets(),
				dbltime_expire: readPacket.ReadUInt32(),
				dbltime_mode: readPacket.ReadUInt32(),
				dbltime_begin: readPacket.ReadUInt32(),
				dbltime_used: readPacket.ReadUInt32(),
				dbltime_max: readPacket.ReadUInt32(),
				time_used: readPacket.ReadUInt32(),
				dbltime_data: readPacket.ReadOctets(),
				storesize: readPacket.ReadUInt16(),
				petcorral: readPacket.ReadOctets(),
				property: readPacket.ReadOctets(),
				var_data: readPacket.ReadOctets(),
				skills: readPacket.ReadOctets(),
				storehousepasswd: readPacket.ReadOctets(),
				waypointlist: readPacket.ReadOctets(),
				coolingtime: readPacket.ReadOctets(),
				npc_relation: readPacket.ReadOctets(),
				multi_exp_ctrl: readPacket.ReadOctets(),
				storage_task: readPacket.ReadOctets(),
				guild_contrib: readPacket.ReadOctets(),
				force_data: readPacket.ReadOctets(),
				online_award: readPacket.ReadOctets(),
				profit_time_data: readPacket.ReadOctets(),
				country_data: readPacket.ReadOctets(),
				// if version is 1.5.1+ then v80+
				// king_data: readPacket.ReadOctets(),
				// meridian_data: readPacket.ReadOctets(),
				// extraprop: readPacket.ReadOctets(),
				// title_data: readPacket.ReadOctets(),
				// reincarnation_data: readPacket.ReadOctets(),
				// realm_data: readPacket.ReadOctets(),
				reserved4: readPacket.ReadUInt32(),
				reserved5: readPacket.ReadUInt32(),
			},
			inventory: {
				capacity: readPacket.ReadUInt32(),
				timestamp: readPacket.ReadUInt32(),
				gold: readPacket.ReadUInt32(),
				...this._items(),
				reserved1: readPacket.ReadUInt32(),
				reserved2: readPacket.ReadUInt32(),				
			},
			equipments: this._items(null, false),
			banker: {
				capacity: readPacket.ReadUInt32(),
				gold: readPacket.ReadUInt32(),
				...this._items(),
				advanced: this._advStorages(),
				// if version is 1.5.1+ then
				// cards: {
				//		cardCap: readPacket.ReadUByte(),
				// 		...this._items()
				// }
			},
			tasks: {
				reserved: readPacket.ReadUInt32(),
				task_data: readPacket.ReadOctets(),		
				task_complete: readPacket.ReadOctets(),		
				task_finishtime: readPacket.ReadOctets(),	
				...this._items()
			}
			
		};
		console.log('asdasd',role.tasks);

		this.resolve("kesz");
	}
	
	_forbidden() {
		const length = this.readPacket.ReadCUInt32();
		const forbidden = [];
		for(let i = 0; i < length; i++) {
			forbidden.push({
				type: this.readPacket.ReadUByte(),
				time: this.readPacket.ReadUInt32(),
				create_time: this.readPacket.ReadUInt32(),
				reason: this.readPacket.ReadUString(),
			});
		}
		return forbidden;
	}
	
	_items(len = null, saveCapacity = true) {
		const length = len || this.readPacket.ReadCUInt32();
		const items = [];
		for(let i = 0; i < length; i++) {
			items.push({
				id: this.readPacket.ReadUInt32(),
				pos: this.readPacket.ReadUInt32(),
				count: this.readPacket.ReadUInt32(),
				max_count: this.readPacket.ReadUInt32(),
				data: this.readPacket.ReadOctets(),
				proctype: this.readPacket.ReadUInt32(),
				expire_date: this.readPacket.ReadUInt32(),
				guid1: this.readPacket.ReadUInt32(),
				guid2: this.readPacket.ReadUInt32(),
				mask: this.readPacket.ReadUInt32(),
			});
		}
		
		if (saveCapacity) {
			return {
				capacity: length,
				items
			};
		} else {
			return items;
		}		
	}
	
	_advStorages() {
		const mat_capacity = this.readPacket.ReadCUInt32();
		const fash_capacity = this.readPacket.ReadCUInt32();
		return {
			mats: {
				capacity: mat_capacity,
				items: this._items(mat_capacity, false)
			},
			fash: {
				capacity: fash_capacity,
				items: this._items(fash_capacity, false)
			},
		}
	}
	
	send(resolve, roleId) {
		this.resolve = resolve;
		this._send(roleId);
	}
	
	_send(roleId) {
		this.data = [];
		this.WriteUInt32(-1); 							  		// allways
		this.WriteUInt32(roleId)			  					// senderId
		this.Pack(0x1F43);							  			// pack opcode and length
		this.SendPacket();										// send packets
	}
}

module.exports = Role;