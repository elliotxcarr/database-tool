import { Component, inject } from '@angular/core';
import { MainStore } from '../store/main/main.store';

@Component({
  selector: 'app-view-record',
  imports: [],
  templateUrl: './view-record.html',
  styleUrl: './view-record.css',
})
export class ViewRecord {
  readonly _mainStore = inject(MainStore);
}
