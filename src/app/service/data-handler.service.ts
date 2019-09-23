import {Injectable, OnInit} from '@angular/core';
import {TestData} from '../data/TestData';
import {BehaviorSubject} from 'rxjs';
import {RepoCategory} from "../model/RepoCategory";
import {Document} from "../model/Document";
import {Sender} from "../model/Sender";
import {Doctype} from "../model/Doctype";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  repoCategories: RepoCategory[];
  private documents: Document[];
  documentBehaviorSubject = new BehaviorSubject<Document[]>(this.documents);
  senderBehaviorSubject = new BehaviorSubject<Sender[]>(TestData.senders);
  doctypeBehaviorSubject = new BehaviorSubject<Doctype[]>(TestData.doctypes);

  constructor() {
    this.repoCategories = TestData.repoCategory;
    this.documents = TestData.documents;
    this.documentBehaviorSubject.next(this.documents);
  }

  deleteDocument(doc: Document) {
    this.documents.forEach( (item, index) => {
      if(item === doc) this.documents.splice(index,1);
    });
    this.documentBehaviorSubject.next(this.documents);
  }
}
