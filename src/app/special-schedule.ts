import { Day } from './day';
import { Time } from './time';

export class SpecialSchedule {

	open_times: Day[];
	valid_start: string;
	valid_end: string;

	constructor(valid_start:string,valid_end:string,open_times?: Day[]){
		this.open_times = open_times || [];
		this.valid_end = valid_end;
		this.valid_start = valid_start;
	}
}
