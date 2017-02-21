import { Time } from './time';
export class Day {
	id: number;
	last_modified: string;
	schedule: number;
	start_day: number;
	start_time: Time;
	end_day: number;
	end_time: Time;
	constructor(id: number, last_modified: string, schedule: number, start_day: number, start_time: Time, end_day: number, end_time: Time) {
		this.id = id || 0;
		this.last_modified = last_modified || '';
		this.schedule = schedule || 0;
		this.start_day = start_day || 0;
		this.start_time = start_time || new Time();
		this.end_day = end_day || 0;
		this.end_time = end_time || new Time();
	}

}
