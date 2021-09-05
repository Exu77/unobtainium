import { DeleteTodoComponent } from './components/delete-todo/delete-todo.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';
import { Todo } from './../../common/types/todo.type';
import { tap } from 'rxjs/operators';
import { TodoService } from './todo.service';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public numberOfTodos = 0;
  public todoList$: Observable<Todo[]>;
  public displayedColumns: string[] = ["song", "descr", "resp", "actions"];

  constructor(
    private readonly todoService: TodoService,
    public dialog: MatDialog
  ) { 
    this.todoList$ = todoService.allTodos$.pipe(
        tap(todoList => {
          this.numberOfTodos = todoList.length;
        console.log('todoList', todoList);
      })
    );
  }

  ngOnInit(): void {
  }

  public openEditDialog(aTodo: Todo): void {
    const dialogRef = this.dialog.open(EditTodoComponent, {
      width: '80%',
      data: aTodo
    });

    dialogRef.afterClosed().subscribe((result: Todo) => {
      if(result) {
        console.log('The dialog was closed', result);
        this.todoService.saveTodo(result);
      }
      
    });
  }

  public openDeletetDialog(aTodo: Todo): void {
    console.log('delete', aTodo);
    const dialogRef = this.dialog.open(DeleteTodoComponent, {
      width: '80%',
      data: aTodo
    });

    dialogRef.afterClosed().subscribe((result: Todo) => {
      if(result) {
        console.log('The dialog was closed', result);
        this.todoService.deleteTodo(result);
      }
      
    });
  }
  public refresh(): void {

  }

}


