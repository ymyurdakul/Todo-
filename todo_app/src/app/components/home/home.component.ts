import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { JsonPipe } from '@angular/common';
import { TodoService } from 'src/app/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = {


  }

  constructor(private todoService: TodoService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllTodos();

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  drop(event: CdkDragDrop<string[]>) {


    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTodo();

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.updateTodo();



    }
  }
  addTodo(item) {
    var val = item.value;
    var obj = { todo: val };
    this.todoService.addTodo(obj).subscribe(res => {
      console.log(res);
      this.getAllTodos();
      item.value="";
    }, err => {
      console.log(err);

    });


  }
  getAllTodos() {

    this.todoService.getAllTodos().subscribe(res => {
      Object.keys(res).forEach(key => {
        this.data[key] = res[key];
      });
      console.log(res);

    }, err => {
      console.log(err);

    });


  }
  updateTodo() {
    this.todoService.updatePost(this.data).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
  removeTodo(id) {
    this.todoService.deleteTodo(id).subscribe(res => {
      console.log(res);
      this.getAllTodos();
    }, err => {
      console.log(err);
    });

    console.log(id);
  }



}
