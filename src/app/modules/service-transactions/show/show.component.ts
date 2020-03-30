import { PrintQualityService } from './../../../services/print-quality/print-quality.service';
import { ModalService } from 'src/app/modules/shared/services/modal/modal.service';
import { StationService } from 'src/app/services/station/station.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';
import { Station } from 'src/app/models/station/station';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';
import { ServiceTransaction } from 'src/app/models/service-transaction/service-transaction';
import { MatTableDataSource } from '@angular/material/table';
import { PaperSize } from 'src/app/models/paper-size/paper-size';
import { PrintQuality } from 'src/app/models/print-quality/print-quality';
import { PaperSizeService } from 'src/app/services/paper-size/paper-size.service';
import { ServiceRateService } from 'src/app/services/service-rate/service-rate.service';
import { ServiceRate } from 'src/app/models/service-rate/service-rate';
import { ServiceTransactionService } from 'src/app/services/service-transaction/service-transaction.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

  station: Station = null;

  isLeaving: boolean = false;

  isOnDuty: boolean = false;

  transactions: ServiceTransaction[];
  mds: MatTableDataSource<ServiceTransaction>;

  paper_sizes: PaperSize[] = [];
  print_qualities: PrintQuality[] = [];
  service_rates: ServiceRate[] = [];

  transactionTableColumns: string[] = [ 'time', 'member', 'sales' ];

  sales: number = 0;


  isLoadingTransactions: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private stationService: StationService,
              private modalService: ModalService,
              private stateService: StateService,
              private router: Router,
              private authService: AuthenticationService,
              private paperSizeService: PaperSizeService,
              private printQualityService: PrintQualityService,
              private serviceRateService: ServiceRateService,
              private serviceTransacrionService: ServiceTransactionService,
              private dialog: MatDialog) {

      this.transactions = [];
      this.mds = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.station = this.stateService.get('active_station');

    if(this.station == null){
      const station_id = this.activatedRoute.snapshot.params['station'];
      this.stationService.read(station_id).subscribe((station: Station) => {

        if(station.current_session){

          this.station = station;
          this.isOnDuty = this.authService.user.id == this.station.current_session.user_id;
          if(this.isOnDuty)
            this.stateService.set('active_station', station);


          this.fetchTransactions();
        }
        else
          this.router.navigate(['/service-transactions']);
      },
      e => {
        this.modalService.toast('Error reading station');
        this.router.navigate(['/service-transactions']);
      })
    }
    else{
      this.isOnDuty = this.authService.user.id == this.station.current_session.user_id;

      this.fetchTransactions();
    }

    this.fetchConfig();
  }

  fetchConfig(): void{

    this.paper_sizes = this.stateService.get('paper_sizes');
    this.print_qualities = this.stateService.get('print_qualities');
    this.service_rates = this.stateService.get('service_rates');

    if(this.paper_sizes == null)
      this.paperSizeService.query().subscribe((paper_sizes: PaperSize[]) => {
        this.paper_sizes = paper_sizes;
        this.stateService.set('paper_sizes', paper_sizes);
      });

    if(this.print_qualities == null)
      this.printQualityService.query().subscribe((print_qualities: PrintQuality[]) => {
        this.print_qualities = print_qualities;
        this.stateService.set('print_qualities', print_qualities);
      });

    if(this.service_rates == null)
      this.serviceRateService.query().subscribe((service_rates: ServiceRate[]) => {
        this.service_rates = service_rates.map(sr => (new ServiceRate).fill(sr));
        this.stateService.set('service_rates', this.service_rates);
      });
  }

  leaveSession(): void{
    this.modalService.prompt({
      question: "Please enter your password to continue",
      required: true,
      password: true
    }).then(password => {

      if(password){
        this.isLeaving = true;
        this.stationService.leave(this.station, password).subscribe((station: Station) => {
          this.stateService.set('active_station', null);
          this.modalService.toast('You leaved the session','Session leaved');
          this.router.navigate([`/service-transactions`]);
          this.isLeaving = false;
        },

        e => {

          if(e.error.message == 'Password is incorrect')
            this.modalService.swal({
              text: 'Incorrect password',
              title: 'Oops!',
              icon: 'error'
            });
          else
            this.modalService.toast('Something went wrong', 'Oops!', 'error');
          this.isLeaving = false;
        })
      }
    })
  }

  newTransaction(): void{


    const dialogRef: MatDialogRef<CreateTransactionComponent> = this.dialog.open(CreateTransactionComponent, {
      width: '90%',
      disableClose: true,
      data: {
        station: this.station,
        paper_sizes: this.paper_sizes,
        print_qualities: this.print_qualities,
        service_rates: this.service_rates
      }
    });

    dialogRef.afterClosed().subscribe((result: ServiceTransaction) => {
      if(result){

        this.transactions.unshift(result);
        this.mds.connect().next(this.transactions);
        this.sales += Number(result.sales);
      }
    });

  }

  fetchTransactions(): void{
    this.isLoadingTransactions = true;
    this.serviceTransacrionService.query({
      params: {
        time: this.station.current_session.time_in,
        station_id: this.station.id
      }
    }).subscribe(transactions => {
      this.transactions = transactions;
      this.mds.connect().next(this.transactions);
      this.isLoadingTransactions = false;

      this.sales = 0;
      this.transactions.forEach(st => {
        this.sales += Number(st.sales);
      });
    })
  }

}
