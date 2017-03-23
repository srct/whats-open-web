import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	choices = [
		{ value: "fairfax", viewValue: "Fairfax Campus" },
		{ value: "arlington", viewValue: "Arlingron Campus" },
		{ value: "princeWilliam", viewValue: "Prince William Campus" }
	];
	constructor() { }

	ngOnInit() {
	}

}
