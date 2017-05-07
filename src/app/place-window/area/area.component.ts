import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../../data-provider.service';
import { Place } from '../../place';
import {SearchService} from '../../search.service';
@Component({
	selector: 'app-area',
	templateUrl: './area.component.html',
	styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
	private places: Place[] = [];
	private placee: Place = new Place();
	private show = false;
	private searchTerm:string = "";
	constructor(private dataProvider: DataProviderService, private search:SearchService) { }

	ngOnInit() {
		this.dataProvider.getFacilities().subscribe(
			(places) => {
				this.places = places;
				this.placee = places[12];
				this.show = true;
			},
			(error) => { console.log(error); }
		)
		this.search.$seachArg.subscribe(
			(term) =>{
				this.searchTerm = term;	
			},
			(error)=>{
				console.log(error);
			}
		)
	}


}
