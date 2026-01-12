import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { reqBody } from '../app/store/query/query.slice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  private readonly http = inject(HttpClient);

  runQuery(query: reqBody):Observable<any[]>{
    return this.http.post<any[]>(`http://localhost:3000/query/run`, query )
  }
}
