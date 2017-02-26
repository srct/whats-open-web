import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
import { Place } from '../place';
@Component({
	selector: 'app-context-bar',
	templateUrl: './context-bar.component.html',
	styleUrls: ['./context-bar.component.scss']
})

export class ContextBarComponent implements OnInit {
	show = true;
	place: Place = new Place();
	error: any;
	constructor(private dataProvider: DataProviderService) { }

	ngOnInit() {
		this.dataProvider.getContext().subscribe(
			(place) => {
				this.place = place;
			}
		);
	}
	tempf() {
		if(localStorage.getItem('facilities')){
			console.log(localStorage.getItem('facilities'))
		}else{
			localStorage.setItem('facilities','hi');
		}
	}
}
