import { Time } from './time';
export class Day {
    id: number;
    last_modified: string;
    schedule:number;
    start_day: number;
    start_time: Time;
    end_day: number;
    end_time: Time;
    constructor(id: number, last_modified: string,schedule:number, start_day: number, start_time: Time, end_day: number, end_time: Time) {
        this.id = id;
        this.last_modified = last_modified;
        this.schedule = schedule;
        this.start_day = start_day;
        this.start_time = start_time;
        this.end_day = end_day;
        this.end_time = end_time;
    }

}
