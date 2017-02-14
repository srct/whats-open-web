import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MockData } from './mock-data'
import { Observable } from 'rxjs/Observable';

import { Place } from './place';
import { Day } from './day';
import { Time } from './time';
// Operators
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
//import 'rxjs/add/operator/debounceTime';
//mport 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/switchMap';
//import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataProviderService {
  // facilities: Observable<Place[]>;
  error: any;
  private Url = 'https://whatsopen.gmu.edu/api/facilities/';  // URL to web API

  constructor(private http: Http) { }
  
  getFacilities(): Observable<Place[]> {
    return this.http.get(this.Url)
      .map(this.extractData)
      .catch(this.handleError);
  }
  
  private extractData(res: Response): Place[] {
    let parseTime = function(time: string):Time{
        const timeArr = time.split(':');
        const hour = Number(timeArr[0]);
        const minute = Number(timeArr[1]);
        const second = Number(timeArr[2]);
        return new Time(hour,minute,second);
  }

    let places: Place[] = [];
    let data = res.json();
    for (let i = 0; i < data.length; i++) {
      let main_schedule_times: Day[] = [];
      for (let e = 0; e < data[i].main_schedule.open_times.length; e++) {
        let jsonDay = data[i].main_schedule.open_times[e];

        const day = new Day(
          jsonDay.id,
          jsonDay.last_modified,
          jsonDay.schedule,
          jsonDay.start_day,
          parseTime(jsonDay.start_time),
          jsonDay.end_day,
          parseTime(jsonDay.end_time));
        main_schedule_times.push(Object.freeze(day));
      }

      places.push(new Place(
        main_schedule_times,
        [],
        data[i].id,
        data[i].last_modified,
        data[i].name,
        data[i].category,
        data[i].location
      ));
    }
    return places;
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
}
