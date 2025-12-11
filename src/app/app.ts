import { Component, signal } from '@angular/core';
import { QueryComponent } from "./query-component/query-component";

@Component({
  selector: 'app-root',
  imports: [ QueryComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('database-tool');
}
