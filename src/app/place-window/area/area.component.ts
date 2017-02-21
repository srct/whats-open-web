import { Component, OnInit, Input } from '@angular/core';
import { DataProviderService } from '../../data-provider.service';
import { Place } from '../../Place';
@Component({
	selector: 'app-area',
	templateUrl: './area.component.html',
	styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
	private places: Place[] = []
	constructor(private dataProvider: DataProviderService) { }

	ngOnInit() {
		this.dataProvider.getFacilities().subscribe(
			(places) => { this.places = places;},
			(error) => { console.log(error); }
		)
	}


}
