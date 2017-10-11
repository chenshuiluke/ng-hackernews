export class Comment{

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

    if(this.descendants > 0 || (this.kids && this.kids.length > 0)){
      this.comments = [];
    }
    console.log(this);
  }
}
