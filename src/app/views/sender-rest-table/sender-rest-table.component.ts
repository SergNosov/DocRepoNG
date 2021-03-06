import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Sender} from "../../model/Sender";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SendersServiceImpl} from "../../service_rest/impl/SendersServiceImpl";

@Component({
    selector: 'app-sender-rest-table',
    templateUrl: './sender-rest-table.component.html',
    styleUrls: ['./sender-rest-table.component.css']
})
export class SenderRestTableComponent implements OnInit, AfterViewInit {

    private displayedColumns: string[] = ['id', 'title', 'action'];
    private dataSource: MatTableDataSource<Sender>;

    @ViewChild(MatSort, {static: false})
    private sort: MatSort;

    @ViewChild(MatPaginator, {static: false})
    private paginator: MatPaginator;

    constructor(private senderService: SendersServiceImpl,
                private router: Router
                ) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource();
        this.reloadData();
    }

    ngAfterViewInit(): void {
        this.addTableObjects();
    }

    public newSender(): void {
        this.router.navigate(['/senderRest/0']);
    }

    public editSender(sender: Sender): void {
        this.router.navigate(['/senderRest/' + sender.id]);
    }

    public deleteSender(sender: Sender): void {
        if (confirm("Удалить отправителя: id = " + sender.id + "; " + sender.title + "?")) {
            this.senderService.delete(sender.id).subscribe(
                data => {
                    console.log(data.valueOf());
                    this.reloadData();
                    alert(data.message);
                },
                error => {
                    console.log(error.valueOf());
                    alert("Невозможно удалить отправителя: id = " + sender.id + "\n" + error.message);
                });
        }
    }

    private reloadData(): void {
        this.getAll();
        this.addTableObjects();
        this.setSortingDataAccessor();
    }

    private getAll():void {
        console.log("getAll()")
        this.senderService.getAll()
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

    private setSortingDataAccessor():void {
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
