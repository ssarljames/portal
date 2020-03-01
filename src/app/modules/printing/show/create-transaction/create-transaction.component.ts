import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { Member } from 'src/app/models/member/member';
import { PrintTransaction } from 'src/app/models/print-transaction/print-transaction';


import * as format from 'date-fns/format';
import { PrintTransactionItem } from 'src/app/models/print-transaction-item/print-transaction-item';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';

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


  constructor(private dialogRef: MatDialogRef<CreateTransactionComponent>) {
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
      console.log('hey');
      transaction_item.valid = true;
      this.transaction_items.data.push(new PrintTransactionItem());
      this.transaction_items.connect().next(this.transaction_items.data);

      console.log(this.transaction_items);

    }
  }


}
