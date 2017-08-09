import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopStoriesComponent } from './top-stories/top-stories.component';
import { ServiceProvider} from "./providers/service.provider"
import { HttpModule} from "@angular/http";
@NgModule({
  declarations: [
    AppComponent,
    TopStoriesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
