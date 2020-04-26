import { Component, OnInit, OnDestroy } from '@angular/core';
import { Student } from 'src/app/models/student/student';
import { StudentService } from 'src/app/services/student/student.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  student: Student;

  subscription: Subscription;

  constructor(private studentService: StudentService,
              private store: Store<{ students: Student[]}>,
              private activatedRoute: ActivatedRoute) {

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

}
