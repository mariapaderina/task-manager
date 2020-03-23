import { TestBed } from '@angular/core/testing';

import { TaskDataServiceService } from './task-data-service.service';

describe('TaskDataServiceService', () => {
  let service: TaskDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
