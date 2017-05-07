import { Pipe, PipeTransform } from '@angular/core';
import { Place } from './place';
@Pipe({
	name: 'search'
})
export class SearchPipe implements PipeTransform {

	transform(value: Place[], arg: string): any {
		let newOrder = [];
		for (let i = 0; i < value.length; i++) {
			if (value[i].isOpen()) {
				newOrder.unshift(value[i]);
			} else {
				newOrder.push(value[i]);
			}
		}
		if (arg !== "") {
			return value.filter((place) => {
				if (place.name.match(new RegExp(arg,'i')) !== null){
					return true;
				}
				if(place.location.match(new RegExp(arg,'i')) !== null){
					return true;
				}
				return false;
			});
		} else {
			return newOrder;
		}

	}

}
