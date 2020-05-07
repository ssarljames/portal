import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/models/student/student';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  saved(student: Student): void{
    this.router.navigate(['/students']);
  }

}
