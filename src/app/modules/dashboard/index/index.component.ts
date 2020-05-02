import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpCollectionResponse } from 'src/app/core/services/resource/resource.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { EventService } from 'src/app/services/event/event.service';
import { PostService } from 'src/app/services/post/post.service';
import { StudentService } from 'src/app/services/student/student.service';


interface DashboardState{
  current_academic_year?: string;
  students?: number;
  events?: number;
  posts?: number;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {


  randomNumber: number = 0;
  $intervalRef: any;

  dashboardState: DashboardState = {};

  constructor(private studentService: StudentService,
              private eventService: EventService,
              private postService: PostService,
              private stateService: StateService) {


    this.$intervalRef = setInterval(() => {
      this.randomNumber = parseInt( (Math.random() * 10000) + '')


      if(this.$intervalRef 
        && this.dashboardState.students > 0
        && this.dashboardState.events > 0
        && this.dashboardState.posts > 0){

        clearInterval(this.$intervalRef);
        
      }

    }, 100);
  }

  ngOnInit(): void {
    this.dashboardState = this.stateService.get('dashboard_counts') || {
      students: -1,
      events: -1,
      posts: -1
    };
    

    this.studentService.queryRaw({
      params: {
        meta_only: 1
      }
    }).subscribe( (response: HttpCollectionResponse) => {
      if(response)
        this.dashboardState.students = response.meta.total
    });


    this.eventService.queryRaw({
      params: {
        meta_only: 1
      }
    }).subscribe( (response: HttpCollectionResponse) => {
      if(response)
        this.dashboardState.events = response.meta.total
    });


    this.postService.queryRaw({
      params: {
        meta_only: 1
      }
    }).subscribe( (response: HttpCollectionResponse) => {
      if(response)
        this.dashboardState.posts = response.meta.total
    });

  }

  ngOnDestroy(): void{
    this.stateService.set('dashboard_counts', this.dashboardState);
  }

}
