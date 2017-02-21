export class Time {
	hour: number;
	minute: number;
	second: number;

	constructor(hour?: number, minute?: number, second?: number) {
		this.hour = hour || 1;
		this.minute = minute || 0;
		this.second = second || 0;
	}

	isGreater(time: Time): boolean {
		if (this.hour > time.hour) {
			return true;
		} else {
			if (this.minute > time.minute) {
				return true;
			} else {
				if (this.second > time.second) {
					return true;
				}
			}
		}
		return false;
	}
	inSeconds() {
		return this.hour * 60 * 60 + this.minute * 60 + this.second;
	}
	fromSeconds(second: number): Time {
		this.hour = Math.trunc(second / 3600);
		second -= this.hour * 3600;
		this.minute = Math.trunc(second / 60);
		second -= this.minute * 60;
		this.second = second;
		return this;
	}
	toString(): string {
		let minute: any = this.minute;

		if (this.minute === 0) {
			minute = '00';
		}

		if (this.hour > 12) {
			return (this.hour - 12 + ':' + minute + ' PM');
		} else {
			return (this.hour + ':' + minute + ' AM');
		}

	}
}
