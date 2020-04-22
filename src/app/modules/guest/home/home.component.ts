import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { Store } from '@ngrx/store';
import { Event } from 'src/app/models/event/event';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  events: Event[] = [];

  constructor(private postService: PostService,
              private eventService: EventService,
              private store: Store<{posts: Post[], events: Event[]}>) {

    store.select('posts').subscribe( posts => {
      this.posts = posts;
    });

    store.select('events').subscribe( events => {
      this.events = events;
    });

  }
  ngOnInit(): void {
    this.postService.query().subscribe()
    this.eventService.query().subscribe()
  }

}
