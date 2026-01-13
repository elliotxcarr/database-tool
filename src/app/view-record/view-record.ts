import { Component, inject } from '@angular/core';
import { MainStore } from '../store/main/main.store';
import { DeepTableComponent } from '../deep-table/deep-table';
import { DeepObjectPipe } from '../deep-value-pipe';

@Component({
  selector: 'app-view-record',
  imports: [DeepTableComponent, DeepObjectPipe],
  templateUrl: './view-record.html',
  styleUrl: './view-record.css',
})
export class ViewRecord {
  readonly _mainStore = inject(MainStore);

  vesselsExpanded = false;

  toggleVessels(){
    this.vesselsExpanded = !this.vesselsExpanded
  }
}