import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, retry, tap } from 'rxjs/operators';
import { BaseUrl } from 'src/environments/environment';
import { Tokens } from 'src/app/public-layout/shared/form';
import { Router } from '@angular/router';
import { ToggleNavService } from '../public-layout/sharedService/toggle-nav.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() public sidenavToggle2 = new EventEmitter();
  private readonly JWT_TOKEN = BaseUrl.jwt_token;
  private readonly REFRESH_TOKEN = BaseUrl.refresh_token;

  constructor(
    public shared: ToggleNavService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  login(user: { username: string; password: string }): Observable<boolean> {
    return this.http.post<any>(BaseUrl.api + 'user/api/v1/token/', user).pipe(
      tap((tokens: any) => {
        this.storeTokens(tokens);
      }),
      mapTo(true),
      catchError((error: any) => {
        if (error.status === 401) {
          this.snackBar.open('wrong username or password', '', {
            duration: 5000,
            panelClass: 'error',
          });
        } else if (error.status === 0) {
          this.snackBar.open('Error', '', {
            duration: 5000,
            panelClass: 'error',
          });
        }
        return of(false);
      })
    );
  }

  // check if user is login
  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken(): any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  // logout user
  public logout() {
    this.removeTokens();
    this.router.navigate(['/']);
  }

  getRefreshToken(): any {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  public storeTokens(tokens: Tokens) {
    localStorage.setItem(this.JWT_TOKEN, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refresh);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
