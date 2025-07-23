import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TodoHeaderComponent } from './components/todo-list/todo-header/todo-header.component';
import { TodoCardComponent } from './components/todo-list/todo-card/todo-card.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, TodoHeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-todo-list';
}
