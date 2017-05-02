import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../../place';
import { Time } from '../../../time';
import { DataProviderService } from '../../../data-provider.service';
import { MdDialog } from '@angular/material';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';
@Component({
	selector: 'app-place-card',
	templateUrl: './place-card.component.html',
	styleUrls: ['./place-card.component.scss']
})

export class PlaceCardComponent implements OnInit {
	@Input() private place: Place;
	private openFor = new Time();
	private isOpen;
	private url;
	constructor(private dataProvider: DataProviderService, public dialog: MdDialog, private sanitizer: DomSanitizer) { }
	ngOnInit() {
		this.url = this.sanitizer.bypassSecurityTrustUrl('https://unsplash.it/200/300?image=' + Math.floor((Math.random() * 999 + 1)));
		let timer = Observable.timer(0,60000);
		timer.subscribe(t => {
			this.openFor = this.place.openFor();
			this.isOpen = this.place.isOpen()
		});
	}
	openInContext() {
		this.dataProvider.setContext(this.place);
		// console.log(this.place.openFor().hour+ " "+ this.place.openFor().minute+ " "+ this.place.openFor().second)
		// console.log(this.place);
	}
	openDialog() {
		let dialogRef = this.dialog.open(FeedbackDialogComponent);
		dialogRef.afterClosed().subscribe(result => {
		});
	}
}