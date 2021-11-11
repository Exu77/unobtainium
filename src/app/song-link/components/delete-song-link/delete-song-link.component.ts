import { SongLink } from '../../../../common/types/song-link.type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-song-link',
  templateUrl: './delete-song-link.component.html',
  styleUrls: ['./delete-song-link.component.scss']
})
export class DeleteSongLinkComponent implements OnInit { 
  constructor(
    public dialogRef: MatDialogRef<DeleteSongLinkComponent>,
    @Inject(MAT_DIALOG_DATA) public aTodo: SongLink,
  ) { }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
