import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SvgGenComponent } from './svg-gen/svg-gen.component';
import { GenuaryComponent } from './genuary/genuary.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgGenComponent,
    GenuaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
