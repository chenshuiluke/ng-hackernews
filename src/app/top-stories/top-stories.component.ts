import {Component, OnInit, EventEmitter, ViewChild} from '@angular/core';
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
  @ViewChild('commentButton') commentButton;
  stories: Story[];
  constructor(private storiesService:StoriesService) {
    this.storiesService.topStories.subscribe((story:Story) => {
      if (typeof this.stories == "undefined") {
        this.stories = [];
      }
      this.stories.push(story)
    });
  }

  ngOnInit() {
    this.storiesService.getTopStories();
    console.log("Started getting top stories");
  }

  trackFn(index, item) {
    return item.id;
  }


}
