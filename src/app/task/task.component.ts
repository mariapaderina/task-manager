import {Component, OnInit} from '@angular/core';
import {Task} from '../models/task';
import {TaskDataServiceService} from '../task-data-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(
    private taskDataService: TaskDataServiceService,
    private activeRouter: ActivatedRoute) {
  }

  ngOnInit() {
  }

  deleteTask(id: number) {
    this.taskDataService.deleteTaskById(id);
  }

  isPastDue(dueDate: Date): boolean {
    if (dueDate.toString().length > 0 && dueDate.toString() < new Date().toISOString().slice(0, 10)) {
      return true;
    }
    return  false;
  }

  completeTask(id: number) {
    this.taskDataService.markTaskCompleted(id);
  }
  get tasks() {
    const priorityFilter = this.activeRouter.snapshot.queryParams.priority;

    if (priorityFilter) {
      return this.taskDataService.getTasksByPriority(priorityFilter);
    }
    return this.taskDataService.getAllTasks();
  }
}

