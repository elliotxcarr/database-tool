import { Component, inject, signal } from '@angular/core';
import { QueryComponent } from "./query-component/query-component";
import { ResultsList } from "./results-list/results-list";
import { ViewRecord } from './view-record/view-record';
import { QueryStore } from './store/query.store';

@Component({
  selector: 'app-root',
  imports: [QueryComponent, ResultsList, ViewRecord],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('database-tool');
  readonly store = inject(QueryStore);
}
