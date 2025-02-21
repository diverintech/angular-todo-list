import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TodoAddNewEntryFormComponent } from '../todo-add-new-entry-form/todo-add-new-entry-form.component';


@Component({
    selector: 'app-todo-header',
    imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatDialogModule],
    templateUrl: './todo-header.component.html',
    styleUrl: './todo-header.component.scss'
})
export class TodoHeaderComponent {
  private dialogService = inject(MatDialog)

  public handleOpenModal(): void {
    this.dialogService.open(TodoAddNewEntryFormComponent, {
      width: '50vw',
      maxHeight: '80vh',
    })
  }


}

