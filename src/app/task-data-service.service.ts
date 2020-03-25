import {Injectable} from '@angular/core';
import {Task} from './models/task';

@Injectable({
  providedIn: 'root'
})

export class TaskDataServiceService {
  private tasks: Array<Task>;
  private lastTaskId = 0;
  private localStorageKey = 'task_manager_state';

  constructor() {
    // this.tasks = this.getMockTasks();
    const localStorageTasks = window.localStorage.getItem(this.localStorageKey);
    if (localStorageTasks) {
      this.tasks = JSON.parse(localStorageTasks);
      this.lastTaskId = Math.max.apply(Math, this.tasks.map(t => t.id));
    }
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

  getTasksByPriority(priority: string): Task[] {
    if (this.tasks) {
      return this.tasks
        .filter(t => t.priority.toLowerCase() === priority.toLowerCase());
    }
    return this.tasks;
  }

  getTasksById(id: number) {
    return this.tasks
      .filter(t => t.id === +id)
      .pop();
  }

  addTask(task: Task) {
    if (!task.id) {
      task.id = ++this.lastTaskId;
    }
    if (this.tasks) {
      this.tasks.push(task);
    } else {
      this.tasks = new Array<Task>(task);
    }
    this.updateStorageState();
  }

  updateTask(newTask: Task) {
    const taskToUpdate = this.getTasksById(newTask.id);
    const indexToUpdate = this.tasks.indexOf(taskToUpdate);

    this.tasks[indexToUpdate] = newTask;
    this.updateStorageState();
  }

  deleteTaskById(id: number) {
    const taskToDelete = this.getTasksById(+id);
    const indexToDelete = this.tasks.indexOf(taskToDelete);
    this.tasks.splice(indexToDelete, 1);
    this.updateStorageState();
  }

  markTaskCompleted(id: number) {
    const taskToUpdate = this.getTasksById(+id);
    const indexToUpdate = this.tasks.indexOf(taskToUpdate);

    this.tasks[indexToUpdate].completed = !(this.tasks[indexToUpdate].completed);
    this.updateStorageState();
  }

  private updateStorageState() {
    if (typeof (Storage) !== 'undefined') {
      // Code for localStorage/sessionStorage.
      window.localStorage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
    } else {
      // Sorry! No Web Storage support..
    }
  }
}

