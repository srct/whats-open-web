export class Time {
    hour: number;
    minute: number;
    second: number;

    constructor(time: string) {
        
        const timeArr = time.split(':');
        this.hour = Number(timeArr[0]);
        this.minute = Number(timeArr[1]);
        this.second = Number(timeArr[2]);
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
