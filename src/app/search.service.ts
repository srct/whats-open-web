import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {
  private searchArg = new Subject<string>();
  $seachArg = this.searchArg.asObservable();

  constructor() { }
  newTerm(term){
    this.searchArg.next(term);
  }
}
