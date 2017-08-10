import { Component, OnInit,Input } from '@angular/core';
import { Comment} from "../models/comment.model";
@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() comments:Comment[];
  constructor() { }

  ngOnInit() {
  }

}
