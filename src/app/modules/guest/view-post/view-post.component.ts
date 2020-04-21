import { Component, OnInit } from '@angular/core';

import { TitleTagService } from '../../../core/services/title-tag/title-tag.service';
import { PostService } from 'src/app/services/post/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post/post';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  post: Post = null;

  constructor(private titleTagService: TitleTagService,
              private postService: PostService,
              private activatedRoute: ActivatedRoute) {

    titleTagService.setTitle('VSU CS3 Post')
  }

  ngOnInit(): void {
    this.postService.read(this.activatedRoute.snapshot.params.id).subscribe( post => {
      this.post = post;

      this.titleTagService.setTitle(post.title);
      this.titleTagService.setSocialMediaTags(
        environment.app_url + '/posts/' + post.id,
        post.title,
        this.titleTagService.extractContent(post.content),
        null,
      )
    });
  }

}
