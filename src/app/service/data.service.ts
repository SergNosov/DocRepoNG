import {Injectable, OnInit} from '@angular/core';
import {TestData} from '../data/TestData';
import {BehaviorSubject} from 'rxjs';
import {RepoCategory} from "../model/RepoCategory";
import {Sender} from "../model/Sender";
import {Doctype} from "../model/Doctype";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  repoCategories: RepoCategory[];
  senderBehaviorSubject = new BehaviorSubject<Sender[]>(TestData.senders);
  doctypeBehaviorSubject = new BehaviorSubject<Doctype[]>(TestData.doctypes);

  constructor() {
    this.repoCategories = TestData.repoCategory;
  }
}
