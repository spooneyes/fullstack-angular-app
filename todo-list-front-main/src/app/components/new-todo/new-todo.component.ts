import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from '../../services';
import type { ITodoCreateParam } from '../../services/interface.service';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.css'],
})
export default class NewTodoComponent implements OnInit {
  constructor(public todoService: TodoService) {}

  ngOnInit(): void {}

  async onSubmit(form: NgForm) {
    if (!form.value.content)
      return;
    const args: ITodoCreateParam = {
      title: form.value.title || undefined,
      content: form.value.content,
      completionDate: form.value.completionDate || undefined,
      assignedTo: form.value.assignedTo || undefined,
    };
    form.reset();
    await this.todoService.createTodo(args);
  }
}
