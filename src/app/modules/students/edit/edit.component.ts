import { Component, OnInit, OnDestroy } from '@angular/core';
import { Student } from 'src/app/models/student/student';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { StudentService } from 'src/app/services/student/student.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  student: Student;

  subscription: Subscription;

  constructor(private studentService: StudentService,
              private store: Store<{ students: Student[]}>,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.subscription = this.store.select('students').subscribe( students => {
      const st = students.find(st => st.id == activatedRoute.snapshot.params.id);
      if(st)
        this.student = (new Student()).fill(st);
      
    })

  }

  ngOnInit(): void {
    this.studentService.read(this.activatedRoute.snapshot.params.id).subscribe();
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  saved(student: Student): void{
    this.router.navigate(['/management','students', student.id]);
  }
}
