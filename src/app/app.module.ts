import { MainPageMembersComponent } from './main-page-members/main-page-members.component';
import { SongLevelService } from './song-level/song-level.service';
import { TodoService } from './todo/todo.service';
import { SongListService } from './song-list/songs-list.service';
import { ErrorInterceptor } from './login/util/error.interceptor';
import { BasicAuthInterceptor } from './login/util/basic-auth.interceptor';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { SongComponent } from './song/song.component';
import { MusicSheetComponent } from './music-sheet/music-sheet.component';
import { AuthGuard } from './login/util/auth.guard';
import { LoginComponent } from './login/login.component';
import { SongListComponent } from './song-list/song-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatChipsModule} from '@angular/material/chips';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TodoComponent } from './todo/todo.component';
import { EditTodoComponent } from './todo/components/edit-todo/edit-todo.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DeleteTodoComponent } from './todo/components/delete-todo/delete-todo.component';
import { SongLevelComponent } from './song-level/song-level.component';
import {MatBadgeModule} from '@angular/material/badge';

const appRoutes: Routes = [
  { path: 'song-list', component: MainPageMembersComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: '', component: MainPageComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    SongComponent,
    SongListComponent,
    MainPageComponent,
    MusicSheetComponent,
    MainPageComponent,
    MainPageMembersComponent,
    LoginComponent,
    TodoComponent,
    EditTodoComponent,
    DeleteTodoComponent,
    SongLevelComponent,    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatBadgeModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    SongListService,
    TodoService,
    SongLevelService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {};
