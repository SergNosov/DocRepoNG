import {Injectable, OnInit} from '@angular/core';
import {TestData} from '../data/TestData';
import {RepoCategory} from "../model/RepoCategory";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  repoCategories: RepoCategory[];

  constructor() {
    this.repoCategories = TestData.repoCategory;
  }
}
