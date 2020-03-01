import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Printer } from 'src/app/models/printer/printer';
import { PrinterService } from 'src/app/services/printer/printer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  printer: Printer;

  transactionTableColumns: string[] = ['created_at'];

  constructor(private activatedRoute: ActivatedRoute,
              private printerService: PrinterService,
              private dialog: MatDialog) {

   }

  ngOnInit(): void {
    const printer_id = this.activatedRoute.snapshot.params['id'];

    this.printerService.read(printer_id).subscribe( (printer: Printer) => {
      this.printer = printer;
    });

  }

  newTransaction(): void{


    const dialogRef: MatDialogRef<CreateTransactionComponent> = this.dialog.open(CreateTransactionComponent, {
      width: '900px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

}
