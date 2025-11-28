import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';

export const routes: Routes = [
  {
    path: '', // <yourdomain>
    component: NoTaskComponent,
  },
  {
    path: 'tasks', // <yourdomain>/tasks,
    component: TasksComponent,
  },
];
