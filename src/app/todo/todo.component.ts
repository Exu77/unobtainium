import { IBandMember, IBandMemberClass } from './../../common/types/member.type';
import { BAND_MEMBERS, COMPARE_BAND_MEMBERS } from './../../common/constants/band-members.constant';
import { SongFolder } from './../../common/types/song.type';
import { DeleteTodoComponent } from './components/delete-todo/delete-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { Todo } from './../../common/types/todo.type';
import { tap } from 'rxjs/operators';
import { TodoService } from './todo.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input()
  public songFolder: SongFolder | undefined;

  public showData = false;
  public numberOfTodos = 0;
  public displayedColumns: string[] = ["song", "descr", "resp", "actions"];
  public bandMembers = BAND_MEMBERS;
  public selectedBandMembers:IBandMemberClass =  {};
  public filteredTodos: Todo[] = [];

  private allTodos: Todo[] = [];
  private bandMemberComperator = COMPARE_BAND_MEMBERS;
  constructor(
    private readonly todoService: TodoService,
    public dialog: MatDialog
  ) { 
  }

  ngOnInit(): void {
    this.todoService.allTodos$.subscribe(inputTodoList => {
      this.allTodos = inputTodoList;
      this.filterTodolist()
      this.numberOfTodos = this.filteredTodos.length;
    });
  }

  public openEditDialog(aTodo: Todo): void {
    const dialogRef = this.dialog.open(EditTodoComponent, {
      width: '80%',
      data: aTodo
    });

    dialogRef.afterClosed().subscribe((result: Todo) => {
      if(result) {
        this.todoService.saveTodo(result);
      }
      
    });
  }

  public openDeletetDialog(aTodo: Todo): void {
    const dialogRef = this.dialog.open(DeleteTodoComponent, {
      width: '80%',
      data: aTodo
    });

    dialogRef.afterClosed().subscribe((result: Todo) => {
      if(result) {
        this.todoService.deleteTodo(result);
      }
      
    });
  }

  public filterClickBandMember(member: IBandMember) {
    if (this.selectedBandMembers[member.name]) {
      delete this.selectedBandMembers[member.name];
    } else {
      this.selectedBandMembers[member.name] = member;
    }
    this.filterTodolist();
  }
  public refresh(): void {

  }

  private filterTodolist() {
    this.filteredTodos = this.allTodos.filter(aTodo => {
      if (this.songFolder && aTodo.song?.id !== this.songFolder?.id) {
        return false;
      }
      const memberKeys = Object.keys(this.selectedBandMembers);
      if (memberKeys?.length > 0) {
        let found = false;
        for (const aMemberName of memberKeys) {
          if (!aTodo.responsibles) {
            return false;
          }
          if (aTodo.responsibles.findIndex(iTodo => this.bandMemberComperator(iTodo, this.selectedBandMembers[aMemberName])) > -1) {
            found = true;
          }
        }
        if (!found) {
          return false
        }
      }
      return true;
    });
  }

}


