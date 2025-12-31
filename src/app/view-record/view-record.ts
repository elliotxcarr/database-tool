import { AfterViewInit, Component, inject } from '@angular/core';
import { QueryStore } from '../store/query.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-view-record',
  imports: [],
  templateUrl: './view-record.html',
  styleUrl: './view-record.css',
})
export class ViewRecord {
  readonly store = inject(QueryStore);

}
