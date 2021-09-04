import { SongFolder } from './../../common/types/song.type';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SongsService } from './../services/songs.service';
import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  public songs$: Observable<SongFolder[]>;
  public isLoading = true;

  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'determinate';
  public value = 50;

  constructor(private songsService: SongsService) { }

  ngOnInit() {
    this.loadSongs();
  }

  public loadSongs() {
    this.isLoading = true;
    this.songs$ = this.songsService.getSongFolders().pipe(
      tap(resp => {
        this.isLoading = false;
      })
    );
  }

}
