import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CategoriesComponent} from './views/categories/categories.component';
import {DocumentsTableComponent} from './views/documents-table/documents-table.component';
import {AppRoutingModule} from "./app-routing.module";
import {SenderTableComponent} from './views/sender-table/sender-table.component';
import {DoctypeTableComponent} from './views/doctype-table/doctype-table.component';
import {DocumentFormComponent} from './views/document-form/document-form.component';
import {StyleLabelInputDirective} from "./directives/styleLabelInput.directive";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DoctypeFormComponent} from './views/doctype-form/doctype-form.component';
import {SenderFormComponent} from './views/sender-form/sender-form.component';
import {NgxBarcodeModule} from 'ngx-barcode';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {SenderRestTableComponent} from './views/sender-rest-table/sender-rest-table.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { SenderRestFormComponent } from './views/sender-rest-form/sender-rest-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ConfirmDialogComponent } from './views/confirm-dialog/confirm-dialog.component';
import { DoctypesRestTableComponent } from './views/doctypes-rest-table/doctypes-rest-table.component';
import { DoctypeRestFormComponent } from './views/doctype-rest-form/doctype-rest-form.component';
import { DocumentsRestTableComponent } from './views/documents-rest-table/documents-rest-table.component';
import { DocumentRestFormComponent } from './views/document-rest-form/document-rest-form.component';
import { MainUnitComponent } from './views/main-unit/main-unit.component';
import { LoginFormComponent } from './views/login-form/login-form.component';

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
        SenderFormComponent,
        SenderRestTableComponent,
        SenderRestFormComponent,
        ConfirmDialogComponent,
        DoctypesRestTableComponent,
        DoctypeRestFormComponent,
        DocumentsRestTableComponent,
        DocumentRestFormComponent,
        MainUnitComponent,
        LoginFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        NgxBarcodeModule,
        NgxQRCodeModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    providers: [],
    entryComponents: [
        ConfirmDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
