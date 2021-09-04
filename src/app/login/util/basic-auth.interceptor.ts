import { AuthenticationConstants } from './../../../common/constants/authentication.constants';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add header with basic auth credentials if user is logged in and request is to the api url
    const user = this.authenticationService.userValue;
    const isLoggedIn = !!(user && user.authdata);
    const isApiUrl = request.url.startsWith(AuthenticationConstants.URL_API_OPEN);
    if (isLoggedIn && isApiUrl) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Basic ${user?.authdata}`
            }
        });
    }

    return next.handle(request);
  }
}
