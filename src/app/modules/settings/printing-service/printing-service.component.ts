import { Component, OnInit } from '@angular/core';
import { PaperSizeService } from '../../../services/paper-size/paper-size.service';
import { PrintQualityService } from '../../../services/print-quality/print-quality.service';
import { PaperSize } from 'src/app/models/paper-size/paper-size';
import { PrintQuality } from 'src/app/models/print-quality/print-quality';
import { Printer } from 'src/app/models/printer/printer';
import { PrintRateService } from 'src/app/services/print-rate/print-rate.service';
import { PrintRate } from 'src/app/models/print-rate/print-rate';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../../shared/services/modal/modal.service';

@Component({
  selector: 'app-printing-service',
  templateUrl: './printing-service.component.html',
  styleUrls: ['./printing-service.component.scss']
})
export class PrintingServiceComponent implements OnInit {

  paper_sizes_mds: MatTableDataSource<PaperSize>;
  print_qualities_mds: MatTableDataSource<PrintQuality>;
  print_rates_mds: MatTableDataSource<PrintRate>;

  paperSizeColumns: string[] = [ 'description', 'dimension' ];
  printQualityColumns: string[] = [ 'description' ];
  printRateColumns: string[] = [ 'paper_size', 'print_quality', 'rate', 'created_at', 'action' ];


  constructor(private paperSizeService: PaperSizeService,
              private printQualityService: PrintQualityService,
              private printRateService: PrintRateService,
              private modalService: ModalService) {

                this.paper_sizes_mds = new MatTableDataSource();
                this.print_qualities_mds = new MatTableDataSource();
                this.print_rates_mds = new MatTableDataSource();

              }

  ngOnInit(): void {
    this.fetchPaperSizes();
    this.fetchPrintQualities();
    this.fetchPrintRates();
  }

  fetchPaperSizes(): void{
    this.paperSizeService.query().subscribe((paper_sizes: PaperSize[]) => {
      this.paper_sizes_mds.connect().next(paper_sizes);
    });
  }

  fetchPrintQualities(): void{
    this.printQualityService.query().subscribe((print_qualities: PrintQuality[]) => {
      this.print_qualities_mds.connect().next(print_qualities);
    });
  }

  fetchPrintRates(): void{
    this.printRateService.query().subscribe((print_rates: PrintRate[]) => {
      this.print_rates_mds.connect().next(print_rates);
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
              this.fetchPrintRates();
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
          this.fetchPrintRates();
        })
    })
  }

  editRate(print_rate: PrintRate): void{
    this.modalService.prompt({
      question: `Enter new rate for ${print_rate.paper_size.description}-${print_rate.print_quality.description}`,
      value: print_rate.rate.toString()
    }).then((rate) => {
      if(rate){
        const pr: PrintRate = JSON.parse(JSON.stringify(print_rate));
        pr.rate = rate;
        this.printRateService.create(pr).subscribe(() => {
          this.modalService.toast('Print rate quality was updated!');
          this.fetchPrintRates();
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
