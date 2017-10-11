import {Component, Input, OnInit} from '@angular/core';
import {Story} from "../models/story.model";

@Component({
  selector: 'story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() story: Story;

  constructor() {
  }

  ngOnInit() {
    console.log(`Story: ${this.story}`);
  }

}
