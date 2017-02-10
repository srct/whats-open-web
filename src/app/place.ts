import { Day } from './day';
export class Place {
    main_schedule_times: Day[] = [];
    special_schedule_times = [];
    id:number;
    last_modified:string;
    name:string;
    category:number;
    location:string;
    constructor(main_schedule_times:Day[],special_schedule_times,id:number,last_modified:string,name:string,category:number,location:string) {
        this.main_schedule_times = main_schedule_times;
        this.special_schedule_times = special_schedule_times;
        this.id = id;
        this.last_modified = last_modified;
        this.name = name;
        this.category = category;
        this.location = location;
    }

}

