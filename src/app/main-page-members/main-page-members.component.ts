import { SongListService } from './../song-list/songs-list.service';
import { SongLevelService } from '../song-level/song-level.service';
import { TodoService } from '../todo/todo.service';
import { SongFile, Song, SongFolder } from '../../common/types/song.type';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-main-page-members',
  templateUrl: './main-page-members.component.html',
  styleUrls: ['./main-page-members.component.scss']
})
export class MainPageMembersComponent {
  public isLoading = false;

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'determinate';
  public value = 50;

  public helpFile?: SongFile;

  
  constructor(
    private readonly todoService: TodoService,
    private readonly songFolderService: SongListService,
    private readonly songLevelService: SongLevelService,

  ) {
    this.songFolderService.getRootFolder().subscribe(rootFolder => {
      this.helpFile =  rootFolder.chordSheets?.find(aChordsheet => aChordsheet.name = 'Help Page')

    });
  }

  public reload() {
    this.todoService.getTodos();
    this.songFolderService.getSongFolders();
    this.songLevelService.getAll();
  }
}
