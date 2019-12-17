import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Document} from "../../model/Document";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {DocumentServiceImpl} from "../../service_rest/impl/DocumentServiceImpl";
import {RepoUtils} from "../../service/RepoUtils";

@Component({
    selector: 'app-documents-rest-table',
    templateUrl: './documents-rest-table.component.html',
    styleUrls: ['./documents-rest-table.component.css']
})
export class DocumentsRestTableComponent implements OnInit, AfterViewInit {

    private displayedColumns: string[] = ['id', 'doctype', 'number','docDate', 'title','sender','action'];
    private dataSource: MatTableDataSource<Document>;
    private token:string = '';

    @ViewChild(MatSort, {static: false})
    private sort: MatSort;

    @ViewChild(MatPaginator, {static: false})
    private paginator: MatPaginator;

    constructor(private documentsService: DocumentServiceImpl,
                private router: Router) {
    }

    ngOnInit() {
        if(!window.localStorage.getItem('token')) {
            this.router.navigate(['/login']);
            return;
        } else {
            this.token = window.localStorage.getItem('token');
        }

        this.dataSource = new MatTableDataSource();
        this.reloadData();
    }

    ngAfterViewInit(): void {
        this.addTableObjects();
    }


    newDocument(): void {
        this.router.navigate(['/documentRest/' + 0]);
    }

    editDocument(document: Document): void {
        this.router.navigate(['/documentRest/' + document.id]);
    }

    deleteDocument(doc: Document): void {
        if (confirm("Удалить документ: id = " + doc.id + "; " + doc.title + "?")) {
            this.documentsService.delete(doc.id).subscribe(
                data => {
                    console.log(data.valueOf());
                    this.reloadData();
                    alert(data.message);
                },
                error => {
                    console.log(error.valueOf());
                    alert("Невозможно удалить документ: id = " + doc.id + "\n" + error.message);
                });
        }
    }

    private reloadData() {
        this.getAll();
        this.addTableObjects();
        this.setSortingDataAccessor();
    }

    private getAll(): void {
        console.log("getAll()");

        this.documentsService.getAll()
            .subscribe(data => {
            this.dataSource.data = data;
            data.forEach((item, index) => {
                /*
                  console.log("data № " + (index + 1) + "; id = " + item.id + ";" +
                      "doctype = " + item.doctype.title + "; " +
                      "number = " + item.number + "; " +
                      "docDate = "+item.docDate+"; "+
                      " title = " + item.title);
              */
            })
        });
/*
        this.documentsService.getAll()
            .subscribe(data => {
                this.dataSource.data = data;
                data.forEach((item, index) => {

                    console.log("data № " + (index + 1) + "; id = " + item.id + ";" +
                        "doctype = " + item.doctype.title + "; " +
                        "number = " + item.number + "; " +
                        "docDate = "+item.docDate+"; "+
                        " title = " + item.title);

                })
            });
 */
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
                case 'number': {
                    return doc.number;
                }
               case 'docDate': {
                 return RepoUtils.dateToString(doc.docDate);
               }
                case 'sender': {
                    if (doc.senders[0] !=undefined){
                        return doc.senders[0].title;
                    } else{
                        return '';
                    }
                }
                case 'title': {
                    return doc.title;
                }
            }
        }
    }
}
