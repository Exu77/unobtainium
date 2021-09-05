import { SongLevelService } from './../song-level/song-level.service';
import { Todo } from './../../common/types/todo.type';
import { TodoService } from './../todo/todo.service';
import { SongListService } from './songs-list.service';
import { SongFolder } from '../../common/types/song.type';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent {
  public songs$: Observable<SongFolder[]>;
  public isLoading = true;

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'determinate';
  public value = 50;
  public todoCounter: any = {};

  
  constructor(
    private readonly todoService: TodoService,
    private readonly songFolderService: SongListService,
    private readonly songLevelService: SongLevelService,

  ) {

    this.isLoading = true;
    this.songs$ = this.songFolderService.songFolderList$.pipe(
      tap(resp => {
        this.isLoading = false;
        console.log('songList?', resp)
      })
    );

    this.todoService.getTodos();
    this.songFolderService.getSongFolders();
    this.songLevelService.getAll();

    this.todoService.allTodos$.subscribe((todos: Todo[]) => {
        this.todoCounter = {};
        todos.forEach(aTodo => {
          if (aTodo?.song?.id) {
            const aCount: number | undefined = this.todoCounter[aTodo.song.id];
            if (aCount) {
              this.todoCounter[aTodo.song.id] = aCount + 1;
            } else {
              this.todoCounter[aTodo.song.id] = 1;
            }
          }
        });
      });
  }
}
