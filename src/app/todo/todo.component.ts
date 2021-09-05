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
  public todoList: Todo[] = [];
  public numberOfTodos = 0;
  public displayedColumns: string[] = ["song", "descr", "resp", "actions"];

  constructor(
    private readonly todoService: TodoService,
    public dialog: MatDialog
  ) { 
  }

  ngOnInit(): void {
    this.todoService.allTodos$.subscribe(inputTodoList => {
      if (!this.songFolder) {
        console.log('all', this.songFolder);
        this.todoList = inputTodoList;
      } else {
        this.todoList = inputTodoList.filter(aTodo => aTodo.song?.id === this.songFolder?.id);
        console.log('filtered', this.songFolder, inputTodoList);
      }
        this.numberOfTodos = this.todoList.length;
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
  public refresh(): void {

  }

}


