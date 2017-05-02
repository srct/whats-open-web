import { Component, OnInit} from '@angular/core';
import { DataProviderService } from '../../data-provider.service';
import { Place } from '../../Place';
@Component({
	selector: 'app-area',
	templateUrl: './area.component.html',
	styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
	private places: Place[] = [];
	private placee:Place = new Place();
	constructor(private dataProvider: DataProviderService) { }

	ngOnInit() {
		this.dataProvider.getFacilities().subscribe(
			(places) => { this.places = places;
			this.placee = places[2];
		console.log(places[2]);},
			(error) => { console.log(error); }
		)
	}


}
