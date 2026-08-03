import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmDetailsService {

    private readonly _httpClient = inject(HttpClient);
  
    getData(title: string, apiKey: string): Observable<any> {
      console.log("Fetching data from API...");
      return this._httpClient.get('http://www.omdbapi.com', {
        params: {
          t: title,
          apiKey
        }
      })
    }
    
}
