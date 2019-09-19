import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/Category';
import {RepoCategory} from "../../model/RepoCategory";
import {DataHandlerService} from "../../service/data-handler.service";
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private repoCategories: RepoCategory[];
  selectedCategory: RepoCategory;

  constructor(private dataHandler: DataHandlerService, private router: Router){
  }

  ngOnInit() {
    this.repoCategories = this.dataHandler.repoCategories;
  }

  showTableByCategory(repoCategory: RepoCategory){
    this.selectedCategory = repoCategory;
    this.router.navigate([repoCategory.link]);
  }
}
