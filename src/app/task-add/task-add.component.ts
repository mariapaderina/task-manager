import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TaskDataServiceService} from '../task-data-service.service';
import {Router} from '@angular/router';
import {Task} from '../models/task';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})

export class TaskAddComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private taskDataServiceService: TaskDataServiceService) {
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      priority: ['', Validators.compose([Validators.required])],
      created: ['', Validators.compose([Validators.required])],
      deadlineDate: [''],
      completedDate: [''],
    });
  }

  addTask() {
    const newTask = new Task();

    newTask.title = this.taskForm.controls.title.value;
    newTask.description = this.taskForm.controls.description.value;
    newTask.priority = this.taskForm.controls.priority.value;
    newTask.created = this.taskForm.controls.created.value;
    newTask.deadlineDate = this.taskForm.controls.deadlineDate.value;
    newTask.completedDate = this.taskForm.controls.completedDate.value;

    this.taskDataServiceService.addTask(newTask);

    // this.router.navigate(['/']);
  }
}




