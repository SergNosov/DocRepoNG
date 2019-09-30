import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import { DocumentsTableComponent } from './views/documents-table/documents-table.component';
import {AppRoutingModule} from "./app-routing.module";
import { SenderTableComponent } from './views/sender-table/sender-table.component';
import { DoctypeTableComponent } from './views/doctype-table/doctype-table.component';
import { DocumentFormComponent } from './views/document-form/document-form.component';
import {StyleLabelInputDirective} from "./directives/styleLabelInput.directive";
import {ReactiveFormsModule} from "@angular/forms";
import { DoctypeFormComponent } from './views/doctype-form/doctype-form.component';
import { SenderFormComponent } from './views/sender-form/sender-form.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    DocumentsTableComponent,
    SenderTableComponent,
    DoctypeTableComponent,
    DocumentFormComponent,
    StyleLabelInputDirective,
    DoctypeFormComponent,
    SenderFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
