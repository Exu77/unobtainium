import { SongsService } from './services/songs.service';
import { ErrorInterceptor } from './login/util/error.interceptor';
import { BasicAuthInterceptor } from './login/util/basic-auth.interceptor';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SongComponent } from './song/song.component';
import { MusicSheetComponent } from './music-sheet/music-sheet.component';
import { AuthGuard } from './login/util/auth.guard';
import { LoginComponent } from './login/login.component';
import { AlbumComponent } from './album/album.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoutes: Routes = [
  { path: 'album', component: AlbumComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '', component: MainPageComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    AlbumComponent,
    MainPageComponent,
    MusicSheetComponent,
    MainPageComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    SongsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
