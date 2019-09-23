import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {DataHandlerService} from "../../service/data-handler.service";
import {Document} from "../../model/Document";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css']
})
export class DocumentsTableComponent implements OnInit {

  private documents: Document[];

  constructor(private dataHandler: DataHandlerService, @Inject(LOCALE_ID) private locale: string) { }

  ngOnInit() {
    this.dataHandler.documentBehaviorSubject.subscribe(newDocs => this.documents = newDocs);
  }

  deleteDocument(doc: Document) {

    const dateDoc = formatDate(doc.date, 'dd.MM.yyyy',this.locale);

    if(confirm("Удалить документ: "+doc.doctype.title+" № "+doc.num+" от "+ dateDoc)) {
      this.dataHandler.deleteDocument(doc);
    }
  }
}
