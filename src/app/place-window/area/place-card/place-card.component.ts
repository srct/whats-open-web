import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../../place';
import { DataProviderService } from '../../../data-provider.service';
import { MdDialog } from '@angular/material';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
	selector: 'app-place-card',
	templateUrl: './place-card.component.html',
	styleUrls: ['./place-card.component.scss']
})

export class PlaceCardComponent implements OnInit {
	@Input() private place: Place;
	private status: string;
	private week: string[] = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
	private url; 
	constructor(private dataProvider: DataProviderService, public dialog: MdDialog,private sanitizer: DomSanitizer) { }
	ngOnInit() {
		this.url = this.sanitizer.bypassSecurityTrustUrl('https://unsplash.it/200/300?image='+Math.floor((Math.random()*999+1)));
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