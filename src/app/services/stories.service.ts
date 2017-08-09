import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response} from '@angular/http';
import {Story} from "../models/story.model";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
@Injectable()
export class StoriesService {
  topStories:EventEmitter<Story[]> = new EventEmitter();
  constructor(private http:Http) { }

  getTopStories(){
    this.http.get("/api/stories/top")
      .map((res:Response) =>{
        let json = res.json();
        console.log(json);
        return json.map((item) => {
          return new Story(item);
        })
      })
      .subscribe((res) => {
        this.topStories.emit(res);
      });
  }

}
