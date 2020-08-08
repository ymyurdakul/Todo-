import { Injectable, inject, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APPLICATION_MODULE_PROVIDERS } from '@angular/core/src/application_module';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, @Inject("apiUrl") private apiUrl) { }
  addTodo
  (obj){
   
    return this.http.post(this.apiUrl,obj);
    
  }
  getAllTodos(){
    return this.http.get(this.apiUrl);

  }
  updatePost(obj){
    return this.http.put(this.apiUrl,obj);

  }
  deleteTodo(id)
  {
    return this.http.delete("https://api.limantech.com/todo/todo/"+id);

  }
}
