import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/models/event/event';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onCreated(event: Event): void{
    this.router.navigate(['/events/' + event.id]);
  }

}
