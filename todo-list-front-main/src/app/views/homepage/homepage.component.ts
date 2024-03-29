import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService, TodoService } from '../../../app/services';
import { ITodo } from '../../../app/services/interface.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export default class HomepageComponent implements OnInit {
  public todos: Array<ITodo> = [];
  public finishedTodos: Array<ITodo> = []

  constructor(
    private titleService: Title,
    private router: Router,
    private authService: AuthService,
    private todoService: TodoService
  ) {
    this.titleService.setTitle('Welcome');
  }

  ngOnInit(): void {
    this.authService.observable$.subscribe(user => { if (!user) this.router.navigate(['login']); });
    this.todoService.todosObservable$.subscribe(todos => {
      this.todos = [];
      todos.forEach(todo => {
        if (todo.completionDate && new Date(todo.completionDate).getTime() - new Date().getTime() < 0)
          this.finishedTodos.push(todo);
        else
          this.todos.push(todo);
      });
    });
    this.todoService.fetchTodos();
  }

  findTodoId(index: number, todo: ITodo) {
    return todo._id;
  }

}
