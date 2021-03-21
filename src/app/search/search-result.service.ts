import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchResultService {
  private searchResults: SearchResult = { type: null, result: null, searchTerm: null };
  private searchResultSource = new  BehaviorSubject(this.searchResults);
  currentSearchResults = this.searchResultSource.asObservable();

  constructor() { }

  /**
   * Used to let other components know if the search result from elasticsearch changed.
   * @param result : a search result from es server
   */
  changeSearchResult(result: SearchResult): void {
    if (result === null) {
      this.searchResultSource.next({type: null, result: null, searchTerm: null});
    } else {
      this.searchResultSource.next(result);
    }
  }
}
