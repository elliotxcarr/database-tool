import { Component, inject } from '@angular/core';
import { QueryStore } from '../store/query/query.store';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from '../multi-select/multi-select';
import { ResultsStore } from '../store/results/results.store';

@Component({
  selector: 'app-results-list',
  imports: [FormsModule, MultiSelect],
  templateUrl: './results-list.html',
  styleUrl: './results-list.css',
})
export class ResultsList {
  readonly _resultsStore = inject(ResultsStore);
}
