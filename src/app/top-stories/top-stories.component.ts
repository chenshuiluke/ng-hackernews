import { Component, OnInit } from '@angular/core';
import {StoriesService} from "../services/stories.service";
import {Story} from "../models/story.model";

@Component({
  selector: 'top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.css']
})
export class TopStoriesComponent implements OnInit {
  stories:Story[];
  constructor(private storiesService:StoriesService) {
    this.storiesService.topStories.subscribe((res)=> {
      this.stories = res;
    });

  }

  ngOnInit() {
    this.storiesService.getTopStories();
  }

}
