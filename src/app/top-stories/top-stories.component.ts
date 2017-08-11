import {Component, OnInit} from '@angular/core';
import {StoriesService} from "../services/stories.service";
import {Story} from "../models/story.model";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/zip';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.css']
})
export class TopStoriesComponent implements OnInit {
  storyStream: Subject<Story> = new Subject();
  stories: Story[];
  constructor(private storiesService:StoriesService) {
    Observable.zip(this.storiesService.topStories, Observable.timer(0, 10), (story, i) => {
      return story;
    })
      .subscribe((story) => {
        if (typeof this.stories == "undefined") {
        this.stories = [];
      }
        this.stories.push(story)
    });
  }

  ngOnInit() {
    this.storiesService.getTopStories();
  }

}
