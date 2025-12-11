import { Component, inject, Input } from '@angular/core';
import { QueryStore } from '../store/query.store';

@Component({
  selector: 'app-statement',
  imports: [],
  templateUrl: './statement.html',
  styleUrl: './statement.css',
})
export class Statement {
  readonly store = inject(QueryStore);
  @Input() index!:number;
}