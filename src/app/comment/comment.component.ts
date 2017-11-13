import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Comment} from '../models/comment.model';

@Component({
  selector: '[comment]',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @ViewChild('commentButton') commentButton;
  @Input() comment:Comment;
  collapsed:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  collapseFromBorder(event){
    console.log(event);
    if(event.layerX < 10){
      this.collapsed = true;
      event.stopPropagation();
    }
  }
  collapse(event){
    this.collapsed = true;
    event.stopPropagation();
  }
  expand(event){
    this.collapsed = false;
    event.stopPropagation();
  }

}
