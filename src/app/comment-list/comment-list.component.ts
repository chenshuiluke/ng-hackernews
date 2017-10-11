import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../models/comment.model";
import {Story} from "../models/story.model";
import {StoriesService} from "../services/stories.service";
@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() comments:Comment[];
  @Input('parent-item') parent:Story|Comment;
  shown: boolean = false;
  constructor(private storiesService:StoriesService) { }

  ngOnInit() {
    console.log(`Parent: ${this.parent}`);
  }

  trackFn(index, item) {
    return item.id;
  }

  toggleShowComments(){
    this.shown = !this.shown;
    if(this.comments.length === 0){
      this.storiesService.getComments(this.parent);
    }
  }

}
