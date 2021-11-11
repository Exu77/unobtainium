import { DeleteSongLinkComponent } from './components/delete-song-link/delete-song-link.component';
import { EditSongLinkComponent } from './components/edit-song-link/edit-song-link.component';
import { MatDialog } from '@angular/material/dialog';
import { SongLinkService } from './song-link.service';
import { Component, Input, OnInit } from '@angular/core';
import { SongFolder } from '../../common/types/song.type';
import { SongLink } from '../../common/types/song-link.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-link',
  templateUrl: './song-link.component.html',
  styleUrls: ['./song-link.component.scss']
})
export class SongLinkComponent implements OnInit {
  @Input()
  public songFolder: SongFolder | undefined;
  public showData = true;
  public displayedColumns: string[] = ["song", "descr", "actions"];
  public filteredLinks: SongLink[] = [];
  public mouseOverEnabled4Ctrl = true;

  private allLinks: SongLink[] = [];
  constructor(
    private readonly songLinkService: SongLinkService,
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.songLinkService.getAllLinks();
   }

  ngOnInit(): void {
    this.songLinkService.allUltimateGuitarLinks$.subscribe(inputLinkList => {
      this.allLinks = inputLinkList;
      this.filterLinks();
      this.showData = this.filteredLinks.length > 0;
      console.log('filtered links', this.allLinks, this.filteredLinks);
    }); 
  }

  public openEditDialog(aLink: SongLink, event: any): void {
    console.log('delete', aLink, event);
    const dialogRef = this.dialog.open(EditSongLinkComponent, {
      width: '80%',
      data: aLink
    });

    dialogRef.afterClosed().subscribe((result: SongLink) => {
      if(result) {
        this.songLinkService.saveLink(result);
      }
    });

    event.stopPropagation();
  }

  public openDeletetDialog(aLink: SongLink, event: any): void {
    console.log('delete', aLink, event);
    const dialogRef = this.dialog.open(DeleteSongLinkComponent, {
      width: '80%',
      data: aLink
    });

    dialogRef.afterClosed().subscribe((result: SongLink) => {
      if(result) {
        this.songLinkService.deleteLink(result);
      }
      
    });
    event.stopPropagation();
  }

  public openLink(aUrl: string): void {
    window.open(aUrl, "_blank");
  }

  private filterLinks() {
    this.filteredLinks = this.allLinks.filter(aLink => {
      if (this.songFolder && aLink.song?.id !== this.songFolder?.id) {
        return false;
      }
      return true;
    });
  }

}
