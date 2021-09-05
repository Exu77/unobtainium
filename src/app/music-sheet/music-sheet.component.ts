import { SongListService } from './../song-list/songs-list.service';
import { SongFile } from './../../common/types/song.type';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AlphaTabApi, Settings } from '@coderline/alphatab';
import { faGuitar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-music-sheet',
  templateUrl: './music-sheet.component.html',
  styleUrls: ['./music-sheet.component.scss']
})
export class MusicSheetComponent implements OnInit, OnChanges {
    public showMusicSheet = false;
    public score: any = {};
    public faGuitar = faGuitar;

    @Input()
    public tabFile: SongFile;

    private alphaTabApi: AlphaTabApi;

    constructor(private readonly songListService: SongListService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabFile']) {
      this.initAplphaTabs();
    }
  }

    ngOnInit() {
    }

    public toggleSheet(): void {
      this.showMusicSheet = !this.showMusicSheet;
      if (this.showMusicSheet) {
        // this.initAplphaTabs();
      }
    }

    public trackClick(track: any) {
      this.alphaTabApi.renderTracks([track]);
    }

    private initAplphaTabs() {
      const wrapper = document.querySelector('.at-wrap');
      const main = wrapper.querySelector('.at-main') as HTMLElement;
      const alphaSettings = new Settings();
      alphaSettings.core.fontDirectory = 'assets/fonts/';
      alphaSettings.core.scriptFile = 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@1.2.1/dist/alphaTab.min.js';
      // alphaSettings.core.scriptFile = 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.min.js';
      alphaSettings.player.enablePlayer = true;
      alphaSettings.player.enableUserInteraction = true;

      alphaSettings.core.file = this.songListService.getFilecontentUrl(this.tabFile.id);

      this.alphaTabApi = new AlphaTabApi(main, alphaSettings);

      // overlay logic
      const overlay = wrapper.querySelector('.at-overlay') as HTMLElement;
      this.alphaTabApi.renderStarted.on(() => {
        overlay.style.display = 'flex';
      });
      this.alphaTabApi.renderFinished.on(() => {
        overlay.style.display = 'none';
      });

      const trackList = wrapper.querySelector('.at-track-list');
// fill track list when the score is loaded
      this.alphaTabApi.scoreLoaded.on((score) => {
        // clear items
        // trackList.innerHTML = '';
        this.score = score;
        // generate a track item for all tracks of the score
        this.score.tracks.forEach((track) => {});
      });
    }
  }
