import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Sender} from "../../model/Sender";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SenderServiceImpl} from "../../service_rest/impl/SenderServiceImpl";
import {MatDialog} from "@angular/material/dialog";
import {SenderEditDialogComponent} from "../sender-edit-dialog/sender-edit-dialog.component";
import {Observable} from "rxjs";

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

    constructor(private senderService: SenderServiceImpl,
                private router: Router,
                private editSenderDialog: MatDialog) {
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

    public showEditSenderDialog(sender: Sender): void {
        const editedSender = new Sender(sender.id, sender.title);
        const dialogRef = this.editSenderDialog.open(SenderEditDialogComponent,
            {
                data: editedSender,
                autoFocus: true
            });

        dialogRef.afterClosed().subscribe(
            result => {
                if (result as Sender) {
                    const tempSender = new Sender(result.id, result.title);
                    if (!this.senderService.isEquals(editedSender, tempSender)) {
                        console.log('Разные объекты:' + '\n' +
                            'editedSender:' + editedSender.id + '; ' + editedSender.title +
                            ' ; ' +
                            'tempSender:' + tempSender.id + '; ' + tempSender.title);
                        this.senderService.saveOrUpdate(tempSender);
                        this.reloadData();
                    }
                }
            }
        )
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
        this.senderService.getAll()
            .subscribe(data => {
                this.dataSource.data = data;
                let senders: Sender[] = data;
                senders.forEach((item, index) => {
                    console.log("Sender № " + (index + 1) + "; id = " + item.id + "; title = " + item.title);
                })
            });

        this.addTableObjects();

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

    private addTableObjects(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }
}
