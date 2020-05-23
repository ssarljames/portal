import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program/program';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal/modal.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router,
              private modalService: ModalService) { }

  ngOnInit(): void {

  }

  onSaved(program: Program): void{
    this.modalService.toast('New program was added.', 'Success', 'success');
    this.router.navigate(['/programs']);
  }

}
