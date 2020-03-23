import {Component, OnInit} from '@angular/core';
import {Task} from '../models/task';
import {TaskDataServiceService} from '../task-data-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private taskDataService: TaskDataServiceService) {
  }

  ngOnInit() {
  }

  deleteTask(id: number) {
    this.taskDataService.deleteTaskById(id);
  }

  get tasks() {
    return this.taskDataService.getAllTasks();
  }
}

