import {Injectable} from '@angular/core';
import {Task} from './models/task';

@Injectable({
  providedIn: 'root'
})

export class TaskDataServiceService {
  private tasks: Array<Task>;
  private lastTaskId = 0;

  constructor() {
    // this.tasks = this.getMockTasks();
  }

  /*
  Mock method to generate tasks
   */

  getMockTasks(): Task[] {
    const newTask = new Task();
    newTask.id = 1;
    newTask.created = new Date(Date.now());
    newTask.description = 'sample desc';
    newTask.priority = 'normal';
    newTask.title = 'mock task 1';

    return [newTask];
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksById(id: number) {
    return this.tasks
      // tslint:disable-next-line:triple-equals
      .filter(t => t.id == id)
      .pop();
  }

  addTask(task: Task): TaskDataServiceService {
    if (!task.id) {
      task.id = ++this.lastTaskId;
    }
    if (this.tasks) {
      this.tasks.push(task);
    } else {
      this.tasks = new Array<Task>(task);
    }
    return this;
  }

  updateTask(newTask: Task) {
    const taskToUpdate = this.getTasksById(newTask.id);
    const indexToUpdate = this.tasks.indexOf(taskToUpdate);

    this.tasks[indexToUpdate] = newTask;
  }

  deleteTaskById(id: number) {
    const taskToDelete = this.getTasksById(+id);
    const indexToDelete = this.tasks.indexOf(taskToDelete);
    this.tasks.splice(indexToDelete, 1);
  }

  applyFilters(): Task[] {
    return this.tasks;
  }


}

