import { TaskComponent } from './task/task.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: TaskComponent,
    data: { title: 'List of tasks' }
  },
  {
    path: 'task/add',
    component: TaskAddComponent,
    data: { title: 'Add task' }
  },
  {
    path: 'task/edit/:id',
    component: TaskEditComponent,
    data: { title: 'Edit task' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
