import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SenderRestTableComponent} from "./views/sender-rest-table/sender-rest-table.component";
import {SenderRestFormComponent} from "./views/sender-rest-form/sender-rest-form.component";
import {DoctypesRestTableComponent} from "./views/doctypes-rest-table/doctypes-rest-table.component";
import {DoctypeRestFormComponent} from "./views/doctype-rest-form/doctype-rest-form.component";
import {DocumentsRestTableComponent} from "./views/documents-rest-table/documents-rest-table.component";
import {DocumentRestFormComponent} from "./views/document-rest-form/document-rest-form.component";
import {MainUnitComponent} from "./views/main-unit/main-unit.component";
import {LoginFormComponent} from "./views/login-form/login-form.component";

const routes: Routes = [
    {path : 'mainunit', component : MainUnitComponent},
    {path : 'login', component : LoginFormComponent},
    {path : '', component : LoginFormComponent},
    {path: 'documentsRest', component: DocumentsRestTableComponent},
    {path: 'documentRest/:id', component: DocumentRestFormComponent},
    {path: 'sendersRest', component: SenderRestTableComponent},
    {path: 'senderRest/:id', component: SenderRestFormComponent},
    {path: 'doctypesRest', component: DoctypesRestTableComponent},
    {path: 'doctypesRest/:id', component: DoctypeRestFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
