import { Component, OnInit, Inject } from '@angular/core';
import { PrintTransaction } from 'src/app/models/print-transaction/print-transaction';
import { PrintTransactionItem } from 'src/app/models/print-transaction-item/print-transaction-item';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrintTransactionService } from 'src/app/services/print-transaction/print-transaction.service';

@Component({
  selector: 'app-transaction-items',
  templateUrl: './transaction-items.component.html',
  styleUrls: ['./transaction-items.component.scss']
})
export class TransactionItemsComponent implements OnInit {


  transactionItemTableColumns: string[] = ['size', 'quality', 'quantity', 'price', 'total'];

  tId: string;
  transaction: PrintTransaction;

  mds: MatTableDataSource<PrintTransactionItem>;


  constructor(@Inject(MAT_DIALOG_DATA) private matData: any,
              private printTransactionService: PrintTransactionService) {
    this.tId = matData.transaction.id;
    this.mds = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.printTransactionService.read(this.tId, {
      params: {
        transaction_items: 1,
        member: 1,
        user: 1
      }
    }).subscribe((transaction: PrintTransaction) => {
      this.transaction = transaction;
      this.mds.connect().next(transaction.transaction_items);
    });
  }

}
