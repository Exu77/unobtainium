import { Todo } from './../../../../common/types/todo.type';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss']
})
export class DeleteTodoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteTodoComponent>,
    @Inject(MAT_DIALOG_DATA) public aTodo: Todo,
  ) { 
    console.log('xxxx', aTodo)
  }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
