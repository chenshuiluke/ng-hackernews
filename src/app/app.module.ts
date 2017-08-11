import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TopStoriesComponent} from './top-stories/top-stories.component';
import {ServiceProvider} from "./providers/service.provider"
import {HttpModule} from "@angular/http";
import {CommentComponent} from './comment/comment.component';
import {CommentListComponent} from './comment-list/comment-list.component';
import {AnimateOnScrollModule} from 'ng2-animate-on-scroll';

@NgModule({
  declarations: [
    AppComponent,
    TopStoriesComponent,
    CommentComponent,
    CommentListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AnimateOnScrollModule.forRoot()
  ],
  providers: [ServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
