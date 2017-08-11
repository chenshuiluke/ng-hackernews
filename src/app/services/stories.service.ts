import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Story} from "../models/story.model";
import "rxjs/add/operator/map";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Rx";

@Injectable()
export class StoriesService {
  topStories: Subject<Story> = new Subject();
  constructor(private http:Http) { }

  getTopStories(){
    this.http.get("/api/stories/top")
      .map((res:Response) =>{
        let json = res.json();
        console.log(json);

        return json.filter((item) => {
          if (typeof item.title != "undefined") {
            return item;
          }
        }).map((item) => {
          return new Story(item);
        })


      })
      .subscribe((res) => {
        Observable.from(res).subscribe((story) => {
          this.topStories.next(<Story>story);
        });
      });
  }

}
