import { Component, inject } from '@angular/core';
import { QueryStore } from '../store/query/query.store';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MultiSelect } from '../multi-select/multi-select';

@Component({
  selector: 'app-query-component',
  imports: [FormsModule, NgClass ],
  templateUrl: './query-component.html',
  styleUrl: './query-component.css',
})
export class QueryComponent {
  readonly store = inject(QueryStore);
}
