import { SongLink } from '../../../../common/types/song-link.type';
import { SongListService } from '../../../song-list/songs-list.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { SongFolder } from '../../../../common/types/song.type';

@Component({
  selector: 'app-edit-song-link',
  templateUrl: './edit-song-link.component.html',
  styleUrls: ['./edit-song-link.component.scss']
})
export class EditSongLinkComponent implements OnInit {
  public songFolders$: Observable<SongFolder[]>;

  constructor(
    public dialogRef: MatDialogRef<EditSongLinkComponent>,
    private readonly songListService: SongListService,
    @Inject(MAT_DIALOG_DATA) public aLink: SongLink
  ) { 
    this.songFolders$ = this.songListService.songFolderList$;
  }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  public compareSongFolders(o1: SongFolder, o2: SongFolder): boolean {
    return o1.id === o2.id;
  } 
}
