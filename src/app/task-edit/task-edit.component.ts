import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Task} from '../models/task';
import {TaskDataServiceService} from '../task-data-service.service';
import {toNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activeRouter: ActivatedRoute,
    private router: Router,
    private taskDataService: TaskDataServiceService
  ) {
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      priority: ['', Validators.compose([Validators.required])],
      created: ['', Validators.compose([Validators.required])],
      deadlineDate: [''],
      completedDate: ['']
    });

    const idToFind = this.activeRouter.snapshot.params.id;

    const task = this.taskDataService.getTasksById(idToFind);

    this.taskForm.setValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      created: task.created,
      deadlineDate: task.deadlineDate,
      completedDate: task.completedDate
    });
  }

  updateTask(editFormValues) {
    const updatedTask = new Task();

    updatedTask.id = +this.activeRouter.snapshot.params.id;

    updatedTask.title = editFormValues.title;
    updatedTask.description = editFormValues.description;
    updatedTask.priority = editFormValues.priority;
    updatedTask.created = editFormValues.created;
    updatedTask.deadlineDate = editFormValues.deadlineDate;
    updatedTask.completedDate = editFormValues.completedDate;

    this.taskDataService.updateTask(updatedTask);
  }
}

