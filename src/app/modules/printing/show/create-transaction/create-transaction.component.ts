import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { Member } from 'src/app/models/member/member';
import { PrintTransaction } from 'src/app/models/print-transaction/print-transaction';


import * as format from 'date-fns/format';
import { PrintTransactionItem } from 'src/app/models/print-transaction-item/print-transaction-item';
import { MatTableDataSource } from '@angular/material/table';

import { PrintTransactionService } from '../../../../services/print-transaction/print-transaction.service';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { Printer } from 'src/app/models/printer/printer';
import { PrintRate } from 'src/app/models/print-rate/print-rate';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit, AfterViewInit {



  @ViewChild('cancelButton') cancelButton: MatButton;

  members: Member[] = [
    {
      id: '1',
      fullname: 'Anonymous'
    }
  ];


  transactionItemTableColumns: string[] = ['size', 'quality', 'quantity', 'price', 'total', 'action'];

  transaction: PrintTransaction;

  mds: MatTableDataSource<PrintTransactionItem>;

  printer: Printer;

  savingTransaction: boolean = false;

  currentTransactionItem: PrintTransactionItem;

  constructor(private dialogRef: MatDialogRef<CreateTransactionComponent>,
              private printTransactionService: PrintTransactionService,
              private modalService: ModalService,
              @Inject(MAT_DIALOG_DATA) private matData: any) {
    this.transaction = new PrintTransaction();
    this.transaction.member_id = '1';
    this.transaction.time = format(new Date(), "MMM DD, YYYY hh:mm A");

    this.currentTransactionItem = new PrintTransactionItem();
    this.transaction.transaction_items = [
      this.currentTransactionItem
    ];

    this.mds = new MatTableDataSource(this.transaction.transaction_items);

    this.printer = matData.printer;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){

  }

  addItem(): void{

    if(this.currentTransactionItem && this.currentTransactionItem.paper_size && this.currentTransactionItem.print_quality){

      let foundDup = this.checkDuplicates();



      if(!foundDup){
        this.currentTransactionItem.markAsValid();
        this.currentTransactionItem = new PrintTransactionItem();
        this.transaction.transaction_items.push(this.currentTransactionItem);
      }

      this.mds.connect().next(this.transaction.transaction_items);

      this.transaction.computeSales();
    }
  }

  checkDuplicates(): boolean{
    let foundDup = false;

    this.transaction.transaction_items.forEach((item: PrintTransactionItem, index: number) => {
      if(!foundDup && item.valid && item.paper_size_id === this.currentTransactionItem.paper_size_id &&
          item.print_quality_id === this.currentTransactionItem.print_quality_id){
          foundDup = true;
          item.quantity += this.currentTransactionItem.quantity;
          this.currentTransactionItem.reset();
      }
    });

    return foundDup;
  }

  removeItem(item: PrintTransactionItem): void{

    if(item.valid){
      this.transaction.transaction_items = this.transaction
                        .transaction_items
                        .filter((t) =>  t.paper_size_id != item.paper_size_id && t.print_quality_id != item.print_quality_id && t.valid);
    }
    else{
      this.currentTransactionItem.reset();
    }


    this.mds.connect().next(this.transaction.transaction_items);
  }

  saveTransaction(): void{

    this.modalService.confirm({
      message: 'Save this transaction?'
    }).then((c) => {
      if(c){

        this.checkDuplicates();

        if(this.currentTransactionItem.is_ready)
          this.addItem();

        this.transaction.transaction_items = this.transaction.transaction_items.filter((item) => item.valid);
        this.transaction.printer_id = this.printer.id;

        this.savingTransaction = true;
        this.printTransactionService.create(this.transaction).subscribe((response) => {
          this.modalService.toast('Transaction saved!');
          this.dialogRef.close(response);
          this.savingTransaction = false;
        },
        (error) => {
          this.modalService.swal({
            title: 'Saving Transaction Failed',
            text: 'Unknown Error Occured',
            icon: 'error'
          });
          this.savingTransaction = false;
        });
      }
    })
  }

  setPrice(): void{


    this.currentTransactionItem.price = 0;
    this.currentTransactionItem.paper_size = null;
    this.currentTransactionItem.print_quality = null;

    this.printer.current_session.print_rates.forEach((pr: PrintRate) => {
      if(this.currentTransactionItem.paper_size_id == pr.paper_size_id &&
          this.currentTransactionItem.print_quality_id == pr.print_quality_id){

          this.currentTransactionItem.price = pr.rate;
          this.currentTransactionItem.paper_size = pr.paper_size;
          this.currentTransactionItem.print_quality = pr.print_quality;

          // console.log(this.currentTransactionItem);

      }
    });
  }

}
