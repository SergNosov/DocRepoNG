import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Doctype} from "../../model/Doctype";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {DoctypesServiceImpl} from "../../service_rest/impl/DoctypesServiceImpl";
import {Router} from "@angular/router";

@Component({
    selector: 'app-doctypes-rest-table',
    templateUrl: './doctypes-rest-table.component.html',
    styleUrls: ['./doctypes-rest-table.component.css']
})
export class DoctypesRestTableComponent implements OnInit, AfterViewInit {

    private displayedColumns: string[] = ['id', 'title', 'action'];
    private dataSource: MatTableDataSource<Doctype>;

    @ViewChild(MatSort, {static: false})
    private sort: MatSort;

    @ViewChild(MatPaginator, {static: false})
    private paginator: MatPaginator;

    constructor(private doctypesService: DoctypesServiceImpl,
                private router: Router) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.reloadData();
    }

    ngAfterViewInit(): void {
        this.addTableObjects();
    }


    newDoctype(): void {
        this.router.navigate(['/doctypesRest/0']);
    }


    editDoctype(doctype: Doctype): void {
        this.router.navigate(['/doctypesRest/' + doctype.id]);
    }

    deleteDoctype(doctype: Doctype) {
        if (confirm("Удалить тип документа: id = " + doctype.id + "; " + doctype.title + "?")) {
            this.doctypesService.delete(doctype.id).subscribe(
                data => {
                    console.log(data.valueOf());
                    this.reloadData();
                    alert(data.message);
                },
                error => {
                    console.log(error.valueOf());
                    alert("Невозможно удалить тип документа: id = " + doctype.id + "\n" + error.message);
                });
        }
    }

    private reloadData() {
        this.getAll();
        this.addTableObjects();
        this.setSortingDataAccessor();
    }

    private getAll(): void {
        console.log("getAll()")
        this.doctypesService.getAll()
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
        this.dataSource.sortingDataAccessor = (sender, colname) => {
            switch (colname) {
                case 'id': {
                    return sender.id;
                }
                case 'title': {
                    return sender.title;
                }
            }
        }
    }
}
