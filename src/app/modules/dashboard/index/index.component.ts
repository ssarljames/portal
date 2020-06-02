import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpCollectionResponse, HttpShowResponse } from 'src/app/core/services/resource/resource.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { EventService } from 'src/app/services/event/event.service';
import { PostService } from 'src/app/services/post/post.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


interface DashboardState{
  students: number;
  events: number;
  posts: number;
  semester: string;
  programs: number;
  colleges: number;
  departments: number;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {


  randomNumber: number = 0;
  $intervalRef: any;

  dashboardState: DashboardState;

  loaded: boolean = false;

  constructor(private http: HttpClient,
              private stateService: StateService) {


    this.$intervalRef = setInterval(() => {
      this.randomNumber = parseInt( (Math.random() * 10000) + '')


      if(this.loaded)
        clearInterval(this.$intervalRef);

    }, 50);
  }

  ngOnInit(): void {
    this.dashboardState = this.stateService.get('dashboard_counts') || {
      students: -1,
      events: -1,
      posts: -1,
      programs: -1,
      colleges: -1,
      departments: -1
    };

    this.loaded = this.stateService.get('dashboard_counts')  ? true : false;
    
    this.http.get(`${environment.endpoint}/data-counts`).subscribe( (response: HttpShowResponse) => {
      this.dashboardState = response.data;
      this.loaded = true;
    });

  }

  ngOnDestroy(): void{
    this.stateService.set('dashboard_counts', this.dashboardState);
  }

}
