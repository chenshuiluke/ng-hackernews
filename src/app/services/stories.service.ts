import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Story} from "../models/story.model";
import "rxjs/add/operator/map";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Rx";
import {Comment} from "../models/comment.model";
import RateLimiter from 'rxjs-ratelimiter';

@Injectable()
export class StoriesService {
  topStories: EventEmitter<Story> = new EventEmitter();
  private rateLimiter = new RateLimiter(10, 5000);
  constructor(private http:Http) { }

  getTopStories(){
    console.log(`In getTopStories()`);
    
    this.http.get("https://hacker-news.firebaseio.com/v0/topstories.json")
    .map((res:Response) =>{
      let json = res.json();
      return json;

    })
    .subscribe((json) => {
    
      console.log(json);
      json.map((item) => {
        this.getStory(item).then((story:Story) => {
          this.topStories.emit(story);
        })
        .catch((err)=>{
          console.log(err);
        });
      })

    });
  }

  getStory(id:number){
    return new Promise((resolve, reject) => {
      this.rateLimiter.limit(
      this.http.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      )
      .subscribe((res:Response) =>{
        let json = res.json();
        let story:Story = new Story(json);
        resolve(story);
      })
    });
  }

  getComments(item: Story|Comment){
    item.kids.map((kid) => {
      console.log(`Getting kid: ${kid}`);
      this.http.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`)
      .subscribe((res:Response) =>{
        let json = res.json();
        //console.log(json);
  
        let comment = new Comment(json);
        item.comments.push(comment);
  
      }) ;
    });
    

  }

}
