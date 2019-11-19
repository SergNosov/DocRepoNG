import {Component, OnInit, ViewChild} from '@angular/core';
import {Document} from "../../model/Document";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DoctypesServiceImpl} from "../../service_rest/impl/DoctypesServiceImpl";
import {Router} from "@angular/router";
import {DocumentsDaoImpl} from "../../dao/impl/DocumentsDaoImpl";

@Component({
  selector: 'app-documents-rest-table',
  templateUrl: './documents-rest-table.component.html',
  styleUrls: ['./documents-rest-table.component.css']
})
export class DocumentsRestTableComponent implements OnInit {

  private displayedColumns: string[] = ['id', 'num', 'title'];
  private dataSource: MatTableDataSource<Document>;

  @ViewChild(MatSort, {static: false})
  private sort: MatSort;

  @ViewChild(MatPaginator, {static: false})
  private paginator: MatPaginator;

  constructor(private documentsService: DocumentsDaoImpl,
              private router: Router) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.reloadData();
  }

  private reloadData() {
    this.getAll();
    this.addTableObjects();
    this.setSortingDataAccessor();
  }

  private getAll(): void {
    console.log("getAll()")
    this.documentsService.getAll()
        .subscribe(data => {
          this.dataSource.data = data;
          data.forEach((item, index) => {
            console.log("data № " + (index + 1) + "; id = " + item.id + "; title = " + item.title);
          })
        });
  }

  private addTableObjects(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private setSortingDataAccessor(): void {
    this.dataSource.sortingDataAccessor = (doc, colname) => {
      switch (colname) {
        case 'id': {
          return doc.id;
        }
        case 'num': {
          return doc.num;
        }
        case 'title': {
          return doc.title;
        }
      }
    }
  }

  newDocument() {

  }

  editDocument(document: any) {
    
  }

  deleteDocument(document: any) {
    
  }
}
