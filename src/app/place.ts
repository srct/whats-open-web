import { Day } from './day';
import { Time } from './time';
import { SpecialSchedule } from './special-schedule';

export class Place {
	main_schedule_times: Day[] = [];
	special_schedules: SpecialSchedule[] = [];
	id: number;
	last_modified: string;
	name: string;
	category: number;
	location: string;
	constructor(main_schedule_times?: Day[], special_schedules?: SpecialSchedule[], id?: number, last_modified?: string,
		name?: string, category?: number, location?: string) {

		this.main_schedule_times = main_schedule_times || [];
		this.special_schedules = special_schedules || [];
		this.id = id || 0;
		this.last_modified = last_modified || '';
		this.name = name || '';
		this.category = category || 0;
		this.location = location || '';
	}
	// This method does NOT work with Special schedules
	isOpen(): boolean {
		const currTime = new Date();
		const inSeconds = currTime.getHours() * 60 * 60 + currTime.getMinutes() * 60 + currTime.getSeconds();
		const dayOfWeekShift = [6, 0, 1, 2, 3, 4, 5];
		const dayOfWeek = dayOfWeekShift[currTime.getDay()];
		const useSpecialSchedule = this.useSpecial();
		let schedule;
		if (useSpecialSchedule === -1) {
			schedule = this.main_schedule_times;
		} else {
			schedule = this.special_schedules[useSpecialSchedule].openTimes;
		}
		// for (let i = 0; i < schedule.length; i++) {
		// 	const day = schedule[i];
		// 	// change the order of if statements at some point
		// 	if (day.start_day !== day.end_day) {
		// 		if (day.end_day === dayOfWeek) {
		// 			if (day.end_time.inSeconds() > inSeconds) {
		// 				return true;
		// 			}
		// 		} else if (day.start_day === dayOfWeek) {
		// 			return true;
		// 		}
		// 	} else {
		// 		if (day.start_day === dayOfWeek) {
		// 			if (day.end_time.inSeconds() > inSeconds) {
		// 				return true;
		// 			}
		// 		}
		// 	}
		// }
		for (let i = 0; i < schedule.length; i++) {
			const day = schedule[i];
			if ((dayOfWeek === day.start_day || dayOfWeek === day.end_day) && day.start_day === day.end_day) {
				if (inSeconds >= day.start_time.inSeconds()) {
					if (inSeconds <= day.end_time.inSeconds()) {
						return true;
					}
					return false;
				}
				return false;
			} else if (dayOfWeek >= day.start_day && dayOfWeek <= day.end_day) {
				if (dayOfWeek === day.start_day) {
					if (inSeconds >= day.start_time.inSeconds()) {
						return true;
					}
					return false;
				} else if (dayOfWeek === day.end_day) {
					if (inSeconds >= day.end_time.inSeconds()) {
						return false;
					}
					return true;
				} else {
					return true;
				}
			}
		}
		console.log('false');
		return false;
	}

	openFor(): any {
		const currTime = new Date();
		const inSeconds = currTime.getHours() * 60 * 60 + currTime.getMinutes() * 60 + currTime.getSeconds();
		const dayOfWeekShift = [6, 0, 1, 2, 3, 4, 5];
		const dayOfWeek = dayOfWeekShift[currTime.getDay()];
		const useSpecialSchedule = this.useSpecial();
		let timeTilClose = new Time();
		let sumSeconds = 0;

		let schedule;
		if (useSpecialSchedule === -1) {
			schedule = this.main_schedule_times;
		} else {
			schedule = this.special_schedules[useSpecialSchedule].openTimes;
		}
		// for (let i = 0; i < schedule.length; i++) {
		// 	const day = schedule[i];
		// 	if (day.end_day !== day.start_day) {
		// 		if (dayOfWeek === day.end_day) {
		// 			sumSeconds = day.end_time.inSeconds() - inSeconds - 86400;
		// 		} else if (dayOfWeek === day.start_day) {
		// 			sumSeconds = day.end_time.inSeconds() + 86400 - inSeconds;
		// 		}
		// 	} else {
		// 		sumSeconds = day.end_time.inSeconds() - inSeconds;
		// 	}

		// 	return timeTilClose.fromSeconds(sumSeconds);
		// }
		
		for (let i = 0; i < schedule.length; i++) {
			const day = schedule[i];
			if ((dayOfWeek === day.start_day || dayOfWeek === day.end_day) && day.start_day === day.end_day) {
				if (inSeconds >= day.start_time.inSeconds()) {
					if (inSeconds <= day.end_time.inSeconds()) {
						sumSeconds = day.end_time.inSeconds() - inSeconds;
					} else {
						//not done
						sumSeconds = 86400 - inSeconds;
					}
				} else {
					sumSeconds = day.start_time.inSeconds() - inSeconds;
				}
				// console.log(sumSeconds);
				return timeTilClose.fromSeconds(sumSeconds);
			} else if (dayOfWeek >= day.start_day && dayOfWeek <= day.end_day) {
				if (dayOfWeek === day.start_day) {
					if (inSeconds >= day.start_time.inSeconds()) {
						sumSeconds = 86400 - inSeconds + (86400 * (day.end_day - day.start_day - 1)) + day.end_time.inSeconds();
					} else {
						sumSeconds = day.start_time.inSeconds() - inSeconds;
					}
				} else if (dayOfWeek === day.end_day) {
					if (inSeconds >= day.end_time.inSeconds()) {
						//not done
						sumSeconds = 86400 - inSeconds;
					} else {
						sumSeconds = day.end_time.inSeconds() - inSeconds;
					}
				} else {
					sumSeconds = 86400 - inSeconds + (86400 * (day.end_day - dayOfWeek - 2)) + day.end_time.inSeconds();
				}
				// console.log(sumSeconds);
				return timeTilClose.fromSeconds(sumSeconds);
			}

		}
		return { "hour": "closed" };
	}

	useSpecial(): number {
		const todaysDate = new Date();
		for (let i = 0; i < this.special_schedules.length; i++) {
			let parsedStart = this.special_schedules[i].validStart.split('-');
			let parsedEnd = this.special_schedules[i].validEnd.split('-');
			if (todaysDate.getFullYear() >= Number(parsedStart[0]) && todaysDate.getFullYear() <= Number(parsedEnd[0])) {
				if (todaysDate.getMonth() >= Number(parsedStart[1]) && todaysDate.getMonth() <= Number(parsedEnd[1])) {
					if (todaysDate.getDate() >= Number(parsedStart[2]) && todaysDate.getDate() <= Number(parsedEnd[2])) {
						return i;
					}
				}
			}
		}
		return -1;
	}
}


