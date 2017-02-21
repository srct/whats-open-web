import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../../place';
import { DataProviderService } from '../../../data-provider.service';

@Component({
	selector: 'app-place-card',
	templateUrl: './place-card.component.html',
	styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent implements OnInit {
	@Input() private place: Place;
	private status: string;
	private week: string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

	constructor(private dataProvider: DataProviderService) { }
	ngOnInit() {
		// this.dataProvider.contextPlace = this.dataProvider.getFacilities()[0];
		// console.log(this.place);
	}
	openInContext() {
		this.dataProvider.setContext(this.place);
	}
}