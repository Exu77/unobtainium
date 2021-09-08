import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SongListService } from './../../../song-list/songs-list.service';
import { Todo } from './../../../../common/types/todo.type';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SongFolder } from '../../../../common/types/song.type';
import { BAND_MEMBERS, COMPARE_BAND_MEMBERS } from '../../../../common/constants/band-members.constant';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  public songFolders$: Observable<SongFolder[]>;
  public bandMemberComperator = COMPARE_BAND_MEMBERS;
  public bandMembers = BAND_MEMBERS;

  constructor(
    public dialogRef: MatDialogRef<EditTodoComponent>,
    private readonly songListService: SongListService,
    @Inject(MAT_DIALOG_DATA) public aTodo: Todo
  ) {
    this.songFolders$ = this.songListService.songFolderList$;
  };

  ngOnInit(): void {
    
    console.log('bandMembers', BAND_MEMBERS);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  public compareSongFolders(o1: SongFolder, o2: SongFolder): boolean {
    return o1.id === o2.id;
  }

}
