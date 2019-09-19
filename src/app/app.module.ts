import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import { DocumentsTableComponent } from './views/documents-table/documents-table.component';
import {AppRoutingModule} from "./app-routing.module";
import { SenderTableComponent } from './views/sender-table/sender-table.component';
import { DoctypeTableComponent } from './views/doctype-table/doctype-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    DocumentsTableComponent,
    SenderTableComponent,
    DoctypeTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
