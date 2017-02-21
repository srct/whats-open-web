import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { Place } from '../../place';
import { Day } from '../../day';
import { DataProviderService } from '../../data-provider.service';
@Component({
	selector: 'app-time-range',
	templateUrl: './time-range.component.html',
	styleUrls: ['./time-range.component.scss']
})

export class TimeRangeComponent implements OnInit {
	@Input() place: Place = new Place();
	days: Day[] = [];
	// weekEndTimes: Date[] = [];

	constructor(private dataProvider: DataProviderService) {
	}

	ngOnInit() {
		// console.log(this.place);
		// for (let i = 0; i < this.place.main_schedule_times.length; i++) {
		// 	for (let e = 0; e < this.place.main_schedule_times.length; e++) {
		// 		if (this.place.main_schedule_times[e].start_day === i) {
		// 			this.days.push(this.place.main_schedule_times[e]);
		// 		}
		// 	}
		// }
	}
	ngOnChanges(change: SimpleChange) {
		console.log('changed');
		this.days = [];
		for (let i = 0; i < this.place.main_schedule_times.length; i++) {
			for (let e = 0; e < this.place.main_schedule_times.length; e++) {
				if (this.place.main_schedule_times[e].start_day === i) {
					this.days.push(this.place.main_schedule_times[e]);
				}
			}
		}
	}
}


