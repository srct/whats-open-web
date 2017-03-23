import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../../place';
import { DataProviderService } from '../../../data-provider.service';
import { MdDialog } from '@angular/material';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
@Component({
	selector: 'app-place-card',
	templateUrl: './place-card.component.html',
	styleUrls: ['./place-card.component.scss']
})

export class PlaceCardComponent implements OnInit {
	@Input() private place: Place;
	private status: string;
	private week: string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

	constructor(private dataProvider: DataProviderService, public dialog: MdDialog) { }
	ngOnInit() {
		// this.dataProvider.contextPlace = this.dataProvider.getFacilities()[0];
		// console.log(this.place);
	}
	openInContext() {
		this.dataProvider.setContext(this.place);
	}
	openDialog() {
		let dialogRef = this.dialog.open(FeedbackDialogComponent);
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}