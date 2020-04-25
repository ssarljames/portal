import { PaperSize } from 'src/app/models/paper-size/paper-size';
import { PrintQuality } from 'src/app/models/print-quality/print-quality';
import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';


import * as format from 'date-fns/format';
import { MatTableDataSource } from '@angular/material/table';

import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { ServiceRate } from 'src/app/models/service-rate/service-rate';
import { ServiceTransaction } from 'src/app/models/service-transaction/service-transaction';
import { ServiceTransactionItem } from 'src/app/models/service-transaction-item/service-transaction-item';
import { ServiceTransactionService } from 'src/app/services/service-transaction/service-transaction.service';
import { Station } from 'src/app/models/station/station';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit, AfterViewInit {

  station: Station;

  @ViewChild('cancelButton') cancelButton: MatButton;

  customers: User[] = [
    (new User()).fill({
      id: '1',
      fullname: 'Anonymous'
    })
  ];


  transactionItemTableColumns: string[] = ['type', 'size', 'quality', 'quantity', 'price', 'total', 'action'];

  transaction: ServiceTransaction;
  currentTransactionItem: ServiceTransactionItem;

  mds: MatTableDataSource<ServiceTransactionItem>;

  savingTransaction: boolean = false;


  paper_sizes: PaperSize[];
  print_qualities: PrintQuality[];
  service_rates: ServiceRate[] = [];

  constructor(private dialogRef: MatDialogRef<CreateTransactionComponent>,
              private modalService: ModalService,
              private serviceTransactionService: ServiceTransactionService,
              @Inject(MAT_DIALOG_DATA) private matData: any) {
    this.transaction = new ServiceTransaction();
    this.transaction.customer_user_id = '1';
    this.transaction.timeFormatted = format(new Date(), "MMM DD, YYYY hh:mm A");

    this.currentTransactionItem = new ServiceTransactionItem();
    this.transaction.transaction_items = [
      this.currentTransactionItem
    ];

    this.mds = new MatTableDataSource(this.transaction.transaction_items);

    this.station = this.matData.station;
    this.paper_sizes = this.matData.paper_sizes;
    this.print_qualities = this.matData.print_qualities;
    this.service_rates = this.matData.service_rates;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(){

  }

  addItem(): void{

    if(this.currentTransactionItem.is_ready){

      let foundDup = this.checkDuplicates();

      if(!foundDup){
        this.currentTransactionItem.markAsValid();

        this.currentTransactionItem = new ServiceTransactionItem();
        this.transaction.transaction_items.push(this.currentTransactionItem);
      }

      this.mds.connect().next(this.transaction.transaction_items);

      this.transaction.computeSales();
    }
  }

  checkDuplicates(): boolean{
    let foundDup = false;

    this.transaction.transaction_items.forEach((item: ServiceTransactionItem, index: number) => {
      if(!foundDup && this.currentTransactionItem.is_printing && item.valid && item.paper_size_id === this.currentTransactionItem.paper_size_id &&
          item.print_quality_id === this.currentTransactionItem.print_quality_id){
          foundDup = true;
          item.quantity += this.currentTransactionItem.quantity;
          this.currentTransactionItem.reset();
      }
      if(!foundDup && this.currentTransactionItem.is_scanning && item.is_scanning && item.valid){
          foundDup = true;
          item.quantity += this.currentTransactionItem.quantity;
          this.currentTransactionItem.reset();
      }
    });

    return foundDup;
  }

  removeItem(item: ServiceTransactionItem): void{

    if(item.valid){
      this.transaction.transaction_items = this.transaction
                        .transaction_items
                        .filter((t) => !(t.type == item.type && t.paper_size_id == item.paper_size_id && t.print_quality_id == item.print_quality_id && t.valid));
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

        this.transaction.station_id = this.station.id;

        this.savingTransaction = true;
        this.serviceTransactionService.create(this.transaction).subscribe((response: ServiceTransaction) => {
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

  setPrice(transaction_item: ServiceTransactionItem): void{

    if(transaction_item.type == 2){
      transaction_item.paper_size_id = null;
      transaction_item.print_quality_id = null;

      console.log(this.service_rates.filter(sr => sr.is_scanning));


      transaction_item.price = this.service_rates.filter(sr => sr.is_scanning)[0].rate;
    }

    else{
      if(transaction_item.paper_size_id)
        transaction_item.paper_size = this.paper_sizes.filter(ps => ps.id == transaction_item.paper_size_id)[0];
      if(transaction_item.print_quality_id)
        transaction_item.print_quality = this.print_qualities.filter(pq => pq.id == transaction_item.print_quality_id)[0];

      if(transaction_item.paper_size_id &&  transaction_item.print_quality_id)
        transaction_item.price = this.service_rates.filter(sr => {
                                  return sr.is_printing
                                          && sr.paper_size_id == transaction_item.paper_size_id
                                          && sr.print_quality_id == transaction_item.print_quality_id
                                })[0].rate;
    }

    // this.matData.station.current_session.print_rates.forEach((pr: PrintRate) => {
    //   if(this.currentTransactionItem.paper_size_id == pr.paper_size_id &&
    //       this.currentTransactionItem.print_quality_id == pr.print_quality_id){

    //       this.currentTransactionItem.price = pr.rate;
    //       this.currentTransactionItem.paper_size = pr.paper_size;
    //       this.currentTransactionItem.print_quality = pr.print_quality;

    //       // console.log(this.currentTransactionItem);

    //   }
    // });
  }

}
