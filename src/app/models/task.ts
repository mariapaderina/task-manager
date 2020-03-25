export class Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  created: Date;
  deadlineDate: Date;
  completedDate: Date;
  completed: boolean = false;
}
