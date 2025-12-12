import { Component, inject } from '@angular/core';
import { conditionsDict, fieldsDict, QueryStore } from '../store/query.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-query-component',
  imports: [FormsModule],
  templateUrl: './query-component.html',
  styleUrl: './query-component.css',
})
export class QueryComponent {
  readonly store = inject(QueryStore);
  conditions: Record<string,string> = conditionsDict;
  fields: Record<string, string> = fieldsDict;
}
