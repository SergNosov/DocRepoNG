import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentsTableComponent} from "./views/documents-table/documents-table.component";
import {SenderTableComponent} from "./views/sender-table/sender-table.component";
import {DoctypeTableComponent} from "./views/doctype-table/doctype-table.component";


const routes: Routes = [
  { path: 'documents', component: DocumentsTableComponent},
  { path: 'senders', component: SenderTableComponent},
  { path: 'doctypes', component: DoctypeTableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
