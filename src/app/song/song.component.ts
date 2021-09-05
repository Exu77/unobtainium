import { SongListService } from './../song-list/songs-list.service';
import { Song } from './../../common/types/song.type';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.scss']
})
export class SongComponent implements OnInit {
  public song: Song;

  @Input()
  public songName: string;
  constructor(private _Activatedroute: ActivatedRoute,
              private _router: Router,
              private songService: SongListService) { } 

  sub;

  ngOnInit() {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      const songName = params.get('id') ? params.get('id') : this.songName;
      this.songService.getSong(songName).subscribe(aSong => {
        this.song = aSong;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
