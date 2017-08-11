import {Component, OnInit} from '@angular/core';
import {StoriesService} from "../services/stories.service";
import {Story} from "../models/story.model";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/delay';

@Component({
  selector: 'top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.css']
})
export class TopStoriesComponent implements OnInit {
  storyStream: Subject<Story> = new Subject();
  stories: Story[] = [];
  constructor(private storiesService:StoriesService) {
    this.storiesService.topStories.delay(500).subscribe((res) => {
      this.stories.push(res);
    });

  }

  ngOnInit() {
    this.storiesService.getTopStories();
  }

}
