import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentsTableComponent} from "./views/documents-table/documents-table.component";
import {SenderTableComponent} from "./views/sender-table/sender-table.component";
import {DoctypeTableComponent} from "./views/doctype-table/doctype-table.component";
import {DocumentFormComponent} from "./views/document-form/document-form.component";


const routes: Routes = [
  { path: 'documents', component: DocumentsTableComponent},
  { path: 'senders', component: SenderTableComponent},
  { path: 'doctypes', component: DoctypeTableComponent},
  { path: 'document', component: DocumentFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
