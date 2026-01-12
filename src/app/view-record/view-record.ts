import { Component, inject } from '@angular/core';
import { QueryStore } from '../store/query/query.store';
import { ResultsStore } from '../store/results/results.store';

@Component({
  selector: 'app-view-record',
  imports: [],
  templateUrl: './view-record.html',
  styleUrl: './view-record.css',
})
export class ViewRecord {
  readonly _resultsStore = inject(ResultsStore);
}
