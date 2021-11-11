import { ErrorUtil } from '../util/error.util';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AuthenticationConstants } from '../../common/constants/authentication.constants';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SongLink } from '../../common/types/song-link.type';

@Injectable({
  providedIn: 'root'
})
export class SongLinkService {
  public allUltimateGuitarLinks$: BehaviorSubject<SongLink[]> = new BehaviorSubject<SongLink[]>([]);
  constructor(
      private http: HttpClient,
    ) { }

  public getAllLinks():void {
      const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/song-link/getAll`;
      this.http.get<SongLink[]>(url)
          .subscribe(todoList => {
              this.allUltimateGuitarLinks$.next(todoList);
          },
          catchError(ErrorUtil.handleError<any>(url, null))
      );
  }

  public saveLink(aLink: SongLink): void {
      const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/song-link/`;
      this.http.post<SongLink[]>(url, aLink)
      .subscribe(todoList => {
          this.allUltimateGuitarLinks$.next(todoList);
      },
      catchError(ErrorUtil.handleError<any>(url, null))
      );
  }

  public deleteLink(aLink: SongLink): void {
      const url = `${environment.apiUrl}/${AuthenticationConstants.URL_API_SECURE}/song-link/${aLink.id}`;
      this.http.delete<SongLink[]>(url)
      .subscribe(todoList => {
          this.allUltimateGuitarLinks$.next(todoList);
      },
      catchError(ErrorUtil.handleError<any>(url, null))
      );
  }
}
