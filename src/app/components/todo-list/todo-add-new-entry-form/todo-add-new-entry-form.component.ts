import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TodoSignalsService } from '../../../services/todo-signals.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TodoHeaderComponent } from '../todo-header/todo-header.component';

@Component({
    selector: 'app-todo-add-new-entry-form',
    imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule],
    templateUrl: './todo-add-new-entry-form.component.html',
    styleUrl: './todo-add-new-entry-form.component.scss'
})
export class TodoAddNewEntryFormComponent {

  private todoSignalsService = inject(TodoSignalsService);
  private dialogRefService = inject(MatDialogRef<TodoHeaderComponent>)
  public allTodos = this.todoSignalsService.todosState();

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  public handleCreateNewTodo(): void {
    if (this.todosForm.value && this.todosForm.valid) {
      const title = String(this.todosForm.controls['title'].value);
      const description = String(this.todosForm.controls['description'].value);
      // Find the highest existing ID and add 1 to it, or use 1 if there are no todos
      const id =
        this.allTodos.length > 0
          ? Math.max(...this.allTodos.map((todo) => todo.id)) + 1
          : 1;

      const done = false;

      this.todoSignalsService.updateTodos({ id, title, description, done });
      this.dialogRefService.close();
    }
  }

  public handleCloseModal(): void {
    this.dialogRefService.close();
  }

}
