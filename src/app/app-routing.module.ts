import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DocumentsTableComponent} from "./views/documents-table/documents-table.component";
import {SenderTableComponent} from "./views/sender-table/sender-table.component";
import {DoctypeTableComponent} from "./views/doctype-table/doctype-table.component";
import {DocumentFormComponent} from "./views/document-form/document-form.component";
import {DoctypeFormComponent} from "./views/doctype-form/doctype-form.component";
import {SenderFormComponent} from "./views/sender-form/sender-form.component";
import {SenderRestTableComponent} from "./views/sender-rest-table/sender-rest-table.component";
import {SenderRestFormComponent} from "./views/sender-rest-form/sender-rest-form.component";
import {DoctypesRestTableComponent} from "./views/doctypes-rest-table/doctypes-rest-table.component";
import {DoctypeRestFormComponent} from "./views/doctype-rest-form/doctype-rest-form.component";

const routes: Routes = [
    {path: 'documents', component: DocumentsTableComponent},
    {path: 'document', component: DocumentFormComponent},
    {path: 'senders', component: SenderTableComponent},
    {path: 'sendersRest', component: SenderRestTableComponent},
    {path: 'sender', component: SenderFormComponent},
    {path: 'senderRest/:id', component: SenderRestFormComponent},
    {path: 'doctypes', component: DoctypeTableComponent},
    {path: 'doctypesRest', component: DoctypesRestTableComponent},
    {path: 'doctype', component: DoctypeFormComponent},
    {path: 'doctypesRest/:id', component: DoctypeRestFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
