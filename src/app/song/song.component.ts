import { SongListService } from './../song-list/songs-list.service';
import { Song, SongFolder } from './../../common/types/song.type';
import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  public song: Song;

  @Input()
  public songFolder: SongFolder;
  constructor(private songService: SongListService) { } 

  ngOnInit() {
      this.songService.getSong(this.songFolder.name).subscribe(aSong => {
        this.song = aSong;
      });
  }

}
