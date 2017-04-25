import { Day } from './day';
import { Time } from './time';

export class SpecialSchedule {

	openTimes: Day[];
	validStart: string;
	validEnd: string;

	constructor(valid_start:string,valid_end:string,open_times?: Day[]){
		this.openTimes = open_times || [];
		this.validEnd = valid_end;
		this.validStart = valid_start;
	}
}
