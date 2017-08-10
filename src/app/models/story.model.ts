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
  retrieved_kids: any[];

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

    if (result.retrieved_kids !== undefined) {
      this.retrieved_kids = [];
      for (var counter = 0; counter < result.retrieved_kids.length; counter++) {
        this.retrieved_kids.push(new Story(result.retrieved_kids[counter]));
      }
    }
  }
}
