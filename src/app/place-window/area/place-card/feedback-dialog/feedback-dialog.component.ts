import { Component} from '@angular/core';
import { MdDialogRef} from '@angular/material';
 
@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})

export class FeedbackDialogComponent  {
  constructor(public dialogRef: MdDialogRef<FeedbackDialogComponent>) {}
}
