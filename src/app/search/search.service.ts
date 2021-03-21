import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResults: SearchResult = { type: null, result: null, searchTerm: null };
  private searchResultSource = new  BehaviorSubject(this.searchResults);
  currentSearchResults = this.searchResultSource.asObservable();

  constructor() { }

  changeSearchResult(result: SearchResult): void {
    if (result === null) {
      this.searchResultSource.next({type: null, result: null, searchTerm: null});
    } else {
      this.searchResultSource.next(result);
    }
  }
}
