import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SvgGenComponent } from './svg-gen/svg-gen.component';
import { CellularAutomataComponent } from './dungeons/cellular-automata/cellular-automata.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgGenComponent,
    CellularAutomataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
