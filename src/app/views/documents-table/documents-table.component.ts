import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
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
    this.documentService.entitysBehaviorSubject.subscribe(newDocs => this.documents = newDocs);
  }

  deleteDocument(doc: Document) {
    const dateDoc = formatDate(doc.date, 'dd.MM.yyyy',this.locale);
    if(confirm("Удалить документ: "+doc.doctype.title+" № "+doc.num+" от "+ dateDoc)) {
      this.documentService.delete(doc);
    }
  }

  editDocument(doc: Document) {
    this.documentService.setEntityBehaviorSubject(doc);
    this.router.navigate(['/document']);
  }

   newDocument() {
     this.documentService.setEntityBehaviorSubject(null);
     this.router.navigate(['/document']);
   }
}
