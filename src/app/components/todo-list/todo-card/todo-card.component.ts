import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoSignalsService } from '../../../services/todo-signals.service';
import { TodoKeyLocalStorage } from '../../../models/enum/todoKeyLocalStorage';
import { Todo } from '../../../models/model/todo.model';


@Component({
    selector: 'app-todo-card',
    imports: [NgFor, NgIf, NgTemplateOutlet, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule],
    templateUrl: './todo-card.component.html',
    styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  private todoSignalsService = inject(TodoSignalsService);

  // todosSignal holds the signal of an array that contains the todos
  private todosSignal = this.todoSignalsService.todosState;

  // todosList is a computed value dependent on todosSignal's current value
  public todosList = computed(() => this.todosSignal());

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  // Retrieve todos from LocalStorage and set them to todosSignal
  private getTodosInLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      const todosData = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;
      if (todosData) {
        this.todosSignal.set(JSON.parse(todosData));
      }
    }
  }

  private saveTodosInLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      this.todoSignalsService.saveTodosInLocalStorage();
    }
  }

  // Toggle the 'done' status of a todo item identified by todoId
  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.update((todos) => {
        return todos.map((todo) =>
          todo.id === todoId ? { ...todo, done: !todo.done } : todo
        );
        this.saveTodosInLocalStorage();
      });
    }
  }

  public handleDeleteTodo(todo: Todo): void {
    // Filters the todos array to create a new array, updatedTodos,
    // which includes all items except the one with the matching id.
    // This effectively removes the specified todo item from the list.
    this.todosSignal.update((todos) => {
      const updatedTodos = todos.filter((item) => item.id !== todo.id);
      return updatedTodos;
    });

    // Save the updated todos list in LocalStorage
    this.saveTodosInLocalStorage();
  }


}