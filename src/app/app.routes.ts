import { Routes } from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { userRoutes } from './users/users.routes';

export const routes: Routes = [
  {
    path: '', // <yourdomain>
    component: NoTaskComponent,
    title: 'No task selected',
  },
  {
    path: 'users/:userId', // <yourdomain>/users/<userId>
    component: UserTasksComponent,
    children: userRoutes,
    data: {
      message: 'hello',
    },
    resolve: {
      userName: resolveUserName,
    },
    title: resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
