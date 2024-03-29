import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ITodo, ITodoCreateParam } from './interface.service'

/**
 * @description This service handles everything note related
 * It exposes four methods: fetchTodos, createTodo and deleteTodo.
 */
@Injectable({
  providedIn: 'root'
})
export default class TodoService {
  public todos$ = new Subject<Array<ITodo>>();
  public todosObservable$ = this.todos$.asObservable();

  constructor() { }

  async fetchTodos(searchTerm?: string) {
    const todosRes = await fetch(`${environment.API_URI}/todo${searchTerm ? `?searchTerm=${searchTerm}` : ''}`, { credentials: 'include' });
    if (!todosRes.ok)
      return;
    const todos: Array<ITodo> = await todosRes.json();
    this.todos$.next(todos);
  }

  async createTodo(args: ITodoCreateParam) {
    const todoRes = await fetch(`${environment.API_URI}/todo`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    if (!todoRes.ok)
      return;
    await this.fetchTodos();
  }


  async deleteTodo(todoId: string) {
    const res = await fetch(`${environment.API_URI}/todo/${todoId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!res.ok)
      return;
    await this.fetchTodos();
  }

}
