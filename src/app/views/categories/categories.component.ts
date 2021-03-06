import {Component, OnInit} from '@angular/core';
import {RepoCategory} from "../../model/RepoCategory";
import {DataService} from "../../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  private repoCategories: RepoCategory[];
  selectedCategory: RepoCategory;

  constructor(private dataHandler: DataService, private router: Router){
  }

  ngOnInit() {
    this.repoCategories = this.dataHandler.repoCategories;
  }

  showTableByCategory(repoCategory: RepoCategory){
    this.selectedCategory = repoCategory;
    this.router.navigate([repoCategory.link]);
  }
}
