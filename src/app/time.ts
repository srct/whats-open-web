export class Time {
    hour: number;
    minute: number;
    second: number;

    constructor(hour:number,minute:number,second:number) {
        this.hour = hour || 0;
        this.minute = minute || 0;
        this.second = second || 0;
    }

    isGreater(time: Time):boolean {
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
    inSeconds(){
        return this.hour*60*60 + this.minute*60+this.second;
    }
}