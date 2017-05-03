import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../data-provider.service';
import { Place } from '../../place';
@Component({
	selector: 'app-area',
	templateUrl: './area.component.html',
	styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
	private places: Place[] = [];
	private placee: Place = new Place();
	private show = false;
	constructor(private dataProvider: DataProviderService) { }

	ngOnInit() {
		this.dataProvider.getFacilities().subscribe(
			(places) => {
				this.places = places;
				this.placee = places[12];
				this.show = true;
			},
			(error) => { console.log(error); }
		)
	}


}
