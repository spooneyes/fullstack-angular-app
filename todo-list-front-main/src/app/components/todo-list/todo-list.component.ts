import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../../services';
import type { ITodo } from '../../services/interface.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export default class TodoListComponent implements OnInit {
  @Input() todo!: ITodo;

  constructor(
    public todoService: TodoService,
  ) { }

  ngOnInit(): void {
  }

  async deleteTodo(id: string) {
    await this.todoService.deleteTodo(id);
  }

}
