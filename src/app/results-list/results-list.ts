import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelect } from '../multi-select/multi-select';
import { MainStore } from '../store/main/main.store';

@Component({
  selector: 'app-results-list',
  imports: [FormsModule, MultiSelect],
  templateUrl: './results-list.html',
  styleUrl: './results-list.css',
})
export class ResultsList {
  readonly _mainStore = inject(MainStore);
}
