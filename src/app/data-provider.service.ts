import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Place } from './place';
import { Day } from './day';
import { Time } from './time';
// Operators
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/DefaultIfEmpty';

@Injectable()
export class DataProviderService {
	// facilities: Observable<Place[]>;
	private contextPlace: Place = new Place();
	places: Place[];
	placesObs: Observable<any>;
	private contextSubj: Subject<Place> = new Subject<Place>();
	private Url = 'https://whatsopen.gmu.edu/api/facilities/';  // URL to web API

	constructor(private http: Http) { }

	getFacilities(): Observable<Place[]> {
		console.log("I was called");
		if (this.places) {
			return Observable.of(this.places);
		} else if (this.placesObs) {
			return this.placesObs;
		} else {
			const facilities = localStorage.getItem('facilities');
			if (facilities) {
				this.places = this.extractData(JSON.parse(facilities));
				this.placesObs = Observable.of(this.places);
				return this.placesObs;
			} else {
				this.placesObs = this.http.get(this.Url)
				.map((data) => {
						this.placesObs = null;
						data = data.json();
						this.places = this.extractData(data);
						this.contextPlace = this.places[0];
						localStorage.setItem('facilities', JSON.stringify(data));
						return this.places;
					})
					.catch(this.handleError).share();
				return this.placesObs;
			}
		}
	}
	getContext(): Observable<Place> {
		return this.contextSubj.asObservable();
	}
	setContext(place: Place): void {
		this.contextPlace = place;
		this.contextSubj.next(place);
	}
	private extractData(data: any): Place[] {
		const parseTime = function (time: string): Time {
			const timeArr = time.split(':');
			const hour = Number(timeArr[0]);
			const minute = Number(timeArr[1]);
			const second = Number(timeArr[2]);
			return new Time(hour, minute, second);
		}
		const places: Place[] = [];
		// const data = res.json();
		for (let i = 0; i < data.length; i++) {
			const main_schedule_times: Day[] = [];

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
