import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TopStoriesComponent} from './top-stories/top-stories.component';
import {ServiceProvider} from "./providers/service.provider"
import {HttpModule} from "@angular/http";
import {CommentComponent} from './comment/comment.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {StoryComponent} from "./story/story.component";
import { CommentListButtonComponent } from './comment-list-button/comment-list-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TopStoriesComponent,
    CommentComponent,
    CommentListComponent,
    StoryComponent,
    CommentListButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
  ],
  providers: [ServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
