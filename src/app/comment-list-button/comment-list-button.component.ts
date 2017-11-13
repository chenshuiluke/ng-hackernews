import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import {Comment} from "../models/comment.model";
import {Story} from "../models/story.model";
@Component({
  selector: 'comment-list-button',
  templateUrl: './comment-list-button.component.html',
  styleUrls: ['./comment-list-button.component.css']
})
export class CommentListButtonComponent implements OnInit {
  @Input('parent-item') parent:Story|Comment;
  shown: boolean = false;
  num:number = 0;
  public shownEmitter:EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit() {
    if(this.parent.descendants){
      this.num = this.parent.descendants;
    }
    else if(this.parent.kids){
      this.num = this.parent.kids.length;
    }
  }

  toggleShowComments(event){
    this.shown = !this.shown;
    this.shownEmitter.emit(this.shown);
    event.stopPropagation();
  }

}
