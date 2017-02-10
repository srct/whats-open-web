export class Day {
    id: number;
    last_modified: string;
    schedule:number;
    start_day: number;
    start_time: string;
    end_day: number;
    end_time: string;
    constructor(id: number, last_modified: string,schedule:number, start_day: number, start_time: string, end_day: number, end_time: string) {
        this.id = id;
        this.last_modified = last_modified;
        this.schedule = schedule;
        this.start_day = start_day;
        this.start_time = start_time;
        this.end_day = end_day;
        this.end_time = end_time;
    }

}
