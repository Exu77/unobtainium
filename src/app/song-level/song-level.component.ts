import { Util } from './../util/util';
import { SongLevel } from './../../common/types/song-level.type';
import { SongLevelService } from './song-level.service';
import { SongFolder } from './../../common/types/song.type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-song-level',
  templateUrl: './song-level.component.html',
  styleUrls: ['./song-level.component.scss']
})
export class SongLevelComponent {
  @Input()
  public songFolder: SongFolder;

  public currentSongLevel: SongLevel = {};
  public daysBetween: number = 999;

  constructor(private readonly songLevelService: SongLevelService) { 
    this.songLevelService.allTodos$.subscribe((songLevelList: SongLevel[]) => {
      const tempSl = songLevelList?.find(aSl => aSl?.song?.id === this.songFolder?.id);
      if (tempSl) {
        this.currentSongLevel = tempSl;
      } else {
        this.currentSongLevel = {
          song: this.songFolder,
          proficiency: 0
        };
      }
      this.calculateLastPlayed();
    });
  }

  public updateProficiency(event: any, aProf: number): void {
    this.currentSongLevel.proficiency = aProf;
    this.songLevelService.save(this.currentSongLevel);
    event.stopPropagation();
  }

  public updateLastPlayedPicker(event: any) {
    this.updateDate(new Date(event.value).toDateString());
  }

  public updateLastPlayed(event: any): void {
    this.updateDate(new Date().toDateString());
    event.stopPropagation();
  }

  public openDatePicer(picker: any, event: any) {
    picker.open();
    event.stopPropagation();
  }

  private updateDate(dateString: string): void {
    this.currentSongLevel.playedLast = dateString;
    this.songLevelService.save(this.currentSongLevel);
  }

  private calculateLastPlayed() {
    if (!this.currentSongLevel.playedLast) {
      this.daysBetween = 999;
    } else {
      this.daysBetween = Util.getDaysBetween(new Date(), new Date(Date.parse(this.currentSongLevel.playedLast)));
    }


  }


}
