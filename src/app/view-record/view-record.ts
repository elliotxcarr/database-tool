import { Component, inject } from '@angular/core';
import { QueryStore } from '../store/query.store';

@Component({
  selector: 'app-view-record',
  imports: [],
  templateUrl: './view-record.html',
  styleUrl: './view-record.css',
})
export class ViewRecord {
  readonly store = inject(QueryStore);
}
