import { Component, inject } from '@angular/core';
import { fieldsDict, QueryStore } from '../store/query.store';

@Component({
  selector: 'app-results-list',
  imports: [],
  templateUrl: './results-list.html',
  styleUrl: './results-list.css',
})
export class ResultsList {
  readonly store = inject(QueryStore);
  fields = fieldsDict;
}
