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
  documentBehaviorSubject = new BehaviorSubject<Document[]>(TestData.documents);
  senderBehaviorSubject = new BehaviorSubject<Sender[]>(TestData.senders);
  doctypeBehaviorSubject = new BehaviorSubject<Doctype[]>(TestData.doctypes);

  constructor() {
    this.repoCategories = TestData.repoCategory;
  }
}
