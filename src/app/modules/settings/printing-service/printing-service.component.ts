import { StateService } from 'src/app/core/services/state/state.service';
import { Component, OnInit } from '@angular/core';
import { PaperSizeService } from '../../../services/paper-size/paper-size.service';
import { PrintQualityService } from '../../../services/print-quality/print-quality.service';
import { PaperSize } from 'src/app/models/paper-size/paper-size';
import { PrintQuality } from 'src/app/models/print-quality/print-quality';
import { ServiceRateService } from 'src/app/services/service-rate/service-rate.service';
import { ServiceRate } from 'src/app/models/service-rate/service-rate';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../../shared/services/modal/modal.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-printing-service',
  templateUrl: './printing-service.component.html',
  styleUrls: ['./printing-service.component.scss']
})
export class PrintingServiceComponent implements OnInit {

  paper_sizes_mds: MatTableDataSource<PaperSize>;
  print_qualities_mds: MatTableDataSource<PrintQuality>;
  service_rates_mds: MatTableDataSource<ServiceRate>;

  isLoadingPaperSizes: boolean = false;
  isLoadingPrintQualities: boolean = false;
  isLoadingServiceRates: boolean = false;

  paperSizeColumns: string[] = [ 'description', 'dimension' ];
  printQualityColumns: string[] = [ 'description' ];
  serviceRateColumns: string[] = [ 'type', 'paper_size', 'print_quality', 'rate', 'created_at', 'action' ];


  constructor(private paperSizeService: PaperSizeService,
              private printQualityService: PrintQualityService,
              private serviceRateService: ServiceRateService,
              private modalService: ModalService,
              private stateService: StateService) {

                this.paper_sizes_mds = new MatTableDataSource();
                this.print_qualities_mds = new MatTableDataSource();
                this.service_rates_mds = new MatTableDataSource();

              }

  ngOnInit(): void {
    this.fetchPaperSizes();
    this.fetchPrintQualities();
    this.fetchServiceRates();
  }

  fetchPaperSizes(): void{
    this.isLoadingPaperSizes = true;
    this.paperSizeService.query().subscribe((paper_sizes: PaperSize[]) => {
      this.paper_sizes_mds.connect().next(paper_sizes);
      this.isLoadingPaperSizes = false;
    });
  }

  fetchPrintQualities(): void{
    this.isLoadingPrintQualities = true;
    this.printQualityService.query().subscribe((print_qualities: PrintQuality[]) => {
      this.print_qualities_mds.connect().next(print_qualities);
      this.isLoadingPrintQualities = false;
    });
  }

  fetchServiceRates(): void{
    this.isLoadingServiceRates = true;
    this.serviceRateService.query().subscribe((service_rates: ServiceRate[]) => {

      const sr = service_rates.map((sr) => (new ServiceRate()).fill(sr));

      this.service_rates_mds.connect().next(sr);
      this.isLoadingServiceRates = false;
    })
  }

  addPaperSize(): void{
    this.modalService.prompt({
      question: 'Enter paper size name:'
    }).then((name) => {
      if(name)
        this.modalService.prompt({
          question: 'Enter dimension: (L x W)'
        }).then((dimension) => {
          if(dimension)
            this.paperSizeService.create({
              description: name,
              dimension: dimension
            }).subscribe(() => {
              this.modalService.toast('Paper added!');
              this.fetchPaperSizes();
              this.fetchServiceRates();


              this.stateService.unset('paper_sizes');
              this.stateService.unset('service_rates');
            })
        });
    })
  }

  addPrintQuality(): void{
    this.modalService.prompt({
      question: 'Enter print quality'
    }).then(description => {
      if(description)
        this.printQualityService.create({
          description: description
        }).subscribe(() => {
          this.modalService.toast('Print quality added!');
          this.fetchPrintQualities();
          this.fetchServiceRates();
          this.stateService.unset('print_qualities');
          this.stateService.unset('service_rates');
        })
    })
  }

  editRate(service_rate: ServiceRate): void{

    let $q = service_rate.is_scanning ? 'Enter rate for scanning' : `Enter new rate for ${service_rate.paper_size.description}-${service_rate.print_quality.description}`;

    this.modalService.prompt({
      question: $q,
      value: service_rate.rate.toString()
    }).then((rate) => {
      if(rate){
        const pr: ServiceRate = JSON.parse(JSON.stringify(service_rate));
        pr.rate = rate;


        this.serviceRateService.create(pr).subscribe(() => {
          this.modalService.toast('Print rate quality was updated!');
          this.fetchServiceRates();
          this.stateService.unset('service_rates');
        },
        (e) => {
          console.log(e);
          this.modalService.alert({
            message: 'Error occured!',
            type: 'warn'
          })
        });
      }
    })
  }

}
