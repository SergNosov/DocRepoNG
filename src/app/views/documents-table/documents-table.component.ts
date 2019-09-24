import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {DataService} from "../../service/data.service";
import {Document} from "../../model/Document";
import {formatDate} from "@angular/common";
import {DocumentService} from "../../service/document.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrls: ['./documents-table.component.css']
})
export class DocumentsTableComponent implements OnInit {

  private documents: Document[];

  constructor(private documentService: DocumentService,
              @Inject(LOCALE_ID) private locale: string,
              private router: Router) { }

  ngOnInit() {
    this.documentService.documentsBehaviorSubject.subscribe(newDocs => this.documents = newDocs);
  }

  deleteDocument(doc: Document) {

    const dateDoc = formatDate(doc.date, 'dd.MM.yyyy',this.locale);

    if(confirm("Удалить документ: "+doc.doctype.title+" № "+doc.num+" от "+ dateDoc)) {
      this.documentService.deleteDocument(doc);
    }
  }

  editDocument(doc: Document) {
    console.log("editDocument from documents-table: "+doc);
    this.documentService.setDocument(doc);
    this.router.navigate(['/document']);
  }
}
