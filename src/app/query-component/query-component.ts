import { Component, inject } from '@angular/core';
import { Statement } from '../statement/statement';
import { QueryStore } from '../store/query.store';

@Component({
  selector: 'app-query-component',
  imports: [Statement],
  templateUrl: './query-component.html',
  styleUrl: './query-component.css',
})
export class QueryComponent {
  readonly store = inject(QueryStore);
}
