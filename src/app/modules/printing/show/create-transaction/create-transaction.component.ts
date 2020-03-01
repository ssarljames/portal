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

  sizes: any = [
    {
      value: 1,
      label: 'Short'
    },
    {
      value: 2,
      label: 'Long'
    }
  ];

  qualities: any = [
    {
      value: 1,
      label: 'Standard'
    },
    {
      value: 2,
      label: 'Colored Text'
    }
  ];

  transactionItemTableColumns: string[] = ['size', 'quality', 'quantity', 'price', 'total', 'action'];

  transaction: PrintTransaction;

  transaction_items: MatTableDataSource<PrintTransactionItem>;


  constructor(private dialogRef: MatDialogRef<CreateTransactionComponent>,
              private printTransactionService: PrintTransactionService,
              private modalService: ModalService,
              @Inject(MAT_DIALOG_DATA) private matData: any) {
    this.transaction = new PrintTransaction();
    this.transaction.member_id = '1';
    this.transaction.time = format(new Date(), "MMM DD, YYYY hh:mm A");

    this.transaction_items = new MatTableDataSource([
      new PrintTransactionItem()
    ]);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){

  }

  addItem(transaction_item: PrintTransactionItem): void{

    if(transaction_item.size && transaction_item.quality){

      let foundDup = false;

      this.transaction_items.data.forEach((item: PrintTransactionItem, index: number) => {
        if(!foundDup && item.valid && item.size === transaction_item.size && item.quality === transaction_item.quality){
          foundDup = true;
          item.quantity += transaction_item.quantity;
        }
      });

      if(!foundDup){
        transaction_item.markAsValid();
        this.transaction_items.data.push(new PrintTransactionItem());
      }
      else
        transaction_item.reset();

      this.transaction_items.connect().next(this.transaction_items.data);

      console.log(this.transaction_items);
    }
  }

  saveTransaction(): void{

    this.transaction.transaction_items = this.transaction_items.data.filter((item) => item.valid);
    this.transaction.printer_id = this.matData.printer.id;

    this.printTransactionService.create(this.transaction).subscribe((response) => {
      this.modalService.toast('Transaction saved!');
      this.dialogRef.close(response);
    },
    (error) => {
      this.modalService.toast('Error occured', 'Ooops!', 'danger');
    });
  }


}
