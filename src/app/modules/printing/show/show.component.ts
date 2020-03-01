import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Printer } from 'src/app/models/printer/printer';
import { PrinterService } from 'src/app/services/printer/printer.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { PrintTransactionService } from 'src/app/services/print-transaction/print-transaction.service';
import { PrintTransaction } from 'src/app/models/print-transaction/print-transaction';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from 'src/app/models/user/user';
import { ModalService } from '../../shared/services/modal/modal.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  printer: Printer;

  transactionTableColumns: string[] = ['time', 'sales'];

  transactions: MatTableDataSource<PrintTransaction>;

  currentUser: User;

  constructor(private activatedRoute: ActivatedRoute,
              private printerService: PrinterService,
              private printTransactionService: PrintTransactionService,
              private authenticationService: AuthenticationService,
              private modalService: ModalService,
              private dialog: MatDialog) {

              this.transactions = new MatTableDataSource();
              this.currentUser = authenticationService.currentUser;
   }

  ngOnInit(): void {
    const printer_id = this.activatedRoute.snapshot.params['id'];

    this.printerService.read(printer_id).subscribe( (printer: Printer) => {
      this.setPrinter(printer);
    });


  }

  setPrinter(printer: Printer): void{
    this.printer = printer;
    this.fetchTransactions();
  }

  fetchTransactions(): void{
    this.printTransactionService.query({
      params: {
        printer_id: this.printer.id,
        user_id: this.currentUser.id
      }
    }).subscribe((transactions: PrintTransaction[]) => {
      this.transactions.connect().next(transactions);
    })
  }

  newTransaction(): void{

    console.log(this.transactions.data);


    const dialogRef: MatDialogRef<CreateTransactionComponent> = this.dialog.open(CreateTransactionComponent, {
      width: '900px',
      disableClose: true,
      data: {
        printer: this.printer
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(result){

        this.transactions.data.unshift(result);
        this.transactions.connect().next(this.transactions.data);
        this.printer.current_session.sales = Number(this.printer.current_session.sales) + Number(result.sales);
      }
    });

  }

  joinPrinting(): void{
    this.printer.set_session_user_id = this.currentUser.id;
    this.printerService.update(this.printer).subscribe((printer: Printer) => {
      this.setPrinter(printer);
      this.modalService.toast('You successfully joined the printing session');
    },
    (e) => {

    });
  }

  leavePrinting(): void{
    this.printer.unset_session_user_id = this.currentUser.id;
    this.printerService.update(this.printer).subscribe((printer: Printer) => {
      this.setPrinter(printer);
      this.modalService.toast('You successfully leaved the printing session');
    },
    (e) => {

    });
  }

}
