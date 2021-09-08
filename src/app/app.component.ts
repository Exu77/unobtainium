import { SongListService } from './song-list/songs-list.service';
import { TodoService } from './todo/todo.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Unobtainium band';
}
