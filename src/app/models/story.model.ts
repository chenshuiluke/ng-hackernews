import {Comment} from "./comment.model";

export class Story{

  by:string;
  descendants:number;
  id:number;
  kids:any[];
  score:number;
  time: string;
  title: string;
  type: string;
  url:string;
  text:string;
  comments: Comment[];

  constructor(result:any){
    this.by = result.by;
    this.descendants = result.descendants;
    this.id = result.id;
    this.kids = result.kids;
    this.score = result.score;
    this.time = result.time;
    this.title = result.title;
    this.type = result.type;
    this.url = result.url;
    this.text = result.text;

    if (this.url == undefined) {
      this.url = "https://news.ycombinator.com/item?id=" + this.id;
    }

    if(this.descendants > 0){
      this.comments = [];
    }
  }
}
