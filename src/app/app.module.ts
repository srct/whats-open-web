import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ContextBarComponent } from './context-bar/context-bar.component';
import { TimeRangeComponent } from './context-bar/time-range/time-range.component';
import { TimeRangeBarComponent } from './context-bar/time-range/time-range-bar/time-range-bar.component';
import { MapComponent } from './context-bar/map/map.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { PlaceWindowComponent } from './place-window/place-window.component';
import { PlaceCardComponent } from './place-window/area/place-card/place-card.component';
import { AreaComponent } from './place-window/area/area.component';
import { ShowHideArrowComponent } from './context-bar/show-hide-arrow/show-hide-arrow.component';
import { FeedbackDialogComponent } from './place-window/area/place-card/feedback-dialog/feedback-dialog.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AppComponent,
		NavBarComponent,
		ContextBarComponent,
		TimeRangeComponent,
		TimeRangeBarComponent,
		MapComponent,
		SafeUrlPipe,
		PlaceWindowComponent,
		PlaceCardComponent,
		AreaComponent,
		ShowHideArrowComponent,
		FeedbackDialogComponent,
		SearchBarComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		MaterialModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents:[FeedbackDialogComponent]
})
export class AppModule { }
