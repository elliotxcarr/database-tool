import { Component, signal } from '@angular/core';
import { QueryComponent } from "./query-component/query-component";
import { ResultsList } from "./results-list/results-list";

@Component({
  selector: 'app-root',
  imports: [QueryComponent, ResultsList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('database-tool');
}
