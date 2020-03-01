import { Component, OnInit } from '@angular/core';
import { PrinterService } from 'src/app/services/printer/printer.service';
import { Printer } from 'src/app/models/printer/printer';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  printers: Printer[];

  isFetching: boolean = true;

  constructor(private printerService: PrinterService) { }

  ngOnInit(): void {
    this.fetchPrinters();
  }

  fetchPrinters(): void{
    this.isFetching = true;
    this.printerService.query().subscribe( (printers: Printer[]) => {
      this.printers = printers;
      this.isFetching = false;
    })
  }

}
