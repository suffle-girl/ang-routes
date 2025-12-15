import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';
import { Task } from '../tasks/task/task.model';
import { inject } from '@angular/core';
import { TasksService } from '../tasks/tasks.service';

const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const order = activatedRoute.queryParams['order'];
  const tasksService = inject(TasksService);
  const userTasks = tasksService
    .allTasks()
    .filter((task) => task.userId === activatedRoute.paramMap.get('userId'))
    .sort((a, b) => {
      if (order === 'desc') {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    });
  return userTasks.length ? userTasks : [];
};

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks', // <yourdomain>/users/<userId>/tasks
    loadComponent: () =>
      import('../tasks/tasks.component').then((mod) => mod.TasksComponent),
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage],
  },
];
