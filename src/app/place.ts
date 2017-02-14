import { Day } from './day';
import { Time } from './time';

export class Place {
	main_schedule_times: Day[] = [];
	special_schedule_times = [];
	id: number;
	last_modified: string;
	name: string;
	category: number;
	location: string;
	constructor(main_schedule_times: Day[], special_schedule_times, id: number, last_modified: string,
		name: string, category: number, location: string) {

		this.main_schedule_times = main_schedule_times;
		this.special_schedule_times = special_schedule_times;
		this.id = id;
		this.last_modified = last_modified;
		this.name = name;
		this.category = category;
		this.location = location;
	}
	// This method does NOT work with Special schedules
	isOpen(): boolean {
		const currTime = new Date();
		const inSeconds = currTime.getHours() * 60 * 60 + currTime.getMinutes() * 60 + currTime.getSeconds();
		const dayOfWeek = currTime.getDay() - 1;

		for (let i = 0; i < this.main_schedule_times.length; i++) {
			const day = this.main_schedule_times[i];
			// change the order of if statements at some point
			if (day.start_day !== day.end_day) {
				if (day.end_day === dayOfWeek) {
					if (day.end_time.inSeconds() > inSeconds) {
						return true;
					}
				} else if (day.start_day === dayOfWeek) {
					return true;
				}
			} else {
				if (day.start_day === dayOfWeek) {
					if (day.end_time.inSeconds() > inSeconds) {
						return true;
					}
				}
			}
		}
		return false;
	}

	openFor() {
		const currTime = new Date();
		const today = currTime.getDay() - 1;
		const inSeconds = currTime.getHours() * 60 * 60 + currTime.getMinutes() * 60 + currTime.getSeconds();
		const dayOfWeek = currTime.getDay() - 1;
		let timeTilClose = new Time();
		let sumSeconds = 0;
		// clean up if statements later
		if (this.isOpen()) {
			for (let i = 0; i < this.main_schedule_times.length; i++) {
				const day = this.main_schedule_times[i];
				if (day.end_day !== day.start_day) {
					if (dayOfWeek === day.end_day) {
						sumSeconds = day.end_time.inSeconds() - inSeconds - 86400;
					} else if (dayOfWeek === day.start_day) {
						sumSeconds =  day.end_time.inSeconds() + 86400 - inSeconds ;
					}
				} else {
					sumSeconds = day.end_time.inSeconds() - inSeconds;
				}
				timeTilClose.fromSeconds(sumSeconds)
				return timeTilClose.toString();
			}
		}else{
			return 'closed';
		}
	}
}


