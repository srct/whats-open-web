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
    // This method does NOT work with Special schedules
    isOpen():boolean{
        const currTime = new Date();
        const inSeconds = currTime.getHours()*60*60+currTime.getMinutes()*60+currTime.getSeconds();
        const today = currTime.getDay() - 1;
        const openDays:Day[] = this.onDay(today);
        for(let i = 0;i<openDays.length;i++){
            let day = openDays[i]; 
            if(day.start_day === today && inSeconds < day.start_time.inSeconds()){
                return true;
            }
            if(day.end_day === today && inSeconds < day.end_time.inSeconds()){
                return true;
            }
        }
        return false;
    }
    // returns index(s) Days that have an end day or start day on a an arg day of the week
    private onDay(dayOfWeek:number):Day[]{

        let days:Day[] = [];
        const currTime = new Date();
        const today = currTime.getDay() - 1;

        for(let i = 0;i<this.main_schedule_times.length;i++){
            let day = this.main_schedule_times[i];
            if(day.start_day === today){
              days.push(day);
             
            }
            if(day.end_day === today){
                days.push(day);
            }
        }
        return days;
    }
}

