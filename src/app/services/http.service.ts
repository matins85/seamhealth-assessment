import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, retryWhen, scan } from 'rxjs';
import { BaseUrl } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Doctors List
  doctotsList(): Observable<any[]> {
    return this.http.get<any[]>(BaseUrl.api + `users`);
  }
}
