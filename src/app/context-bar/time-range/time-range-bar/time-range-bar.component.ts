import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../../place';
import { Time } from '../../../time';
import { Day } from '../../../day';

@Component({
	selector: 'app-time-range-bar',
	templateUrl: './time-range-bar.component.html',
	styleUrls: ['./time-range-bar.component.scss']
})
export class TimeRangeBarComponent implements OnInit {
	@Input() day: Day;
	// blue bar x location and width
	barX: number;
	barWidth: number;

	// width between startTimeX and barX
	barStartWidth: number = 3;

	// width between the end of the bar and the endTextX location
	barEndWidth: number = 38;

	// text x locations
	startTimeTextX: number;
	endTimeTextX: number;

	dayOfWeek: string;
	week: string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT","SUN"];

	constructor() { }

	ngOnInit() {
		this.barX = this.timeToPixel(this.day.start_time);
		this.barWidth = this.timeToPixel(this.day.end_time) - this.barX;
		this.startTimeTextX = this.barX + this.barStartWidth;
		this.endTimeTextX = this.barWidth + this.barX - this.barEndWidth;
		this.dayOfWeek = this.week[this.day.start_day];

	}
	timeToPixel(time: Time): number {
		// this equals 304(the length of the ticks) divided by the amount of minutes in a day
		let pixelPerMinute = 0.2111111111111111;
		return 40 + ((time.hour * 60 + time.minute) * pixelPerMinute);
	}

}
