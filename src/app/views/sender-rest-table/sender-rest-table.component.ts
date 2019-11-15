import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Sender} from "../../model/Sender";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {SenderServiceImpl} from "../../service_rest/impl/SenderServiceImpl";
import {MatDialog} from "@angular/material/dialog";
import {SenderEditDialogComponent} from "../sender-edit-dialog/sender-edit-dialog.component";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Component({
    selector: 'app-sender-rest-table',
    templateUrl: './sender-rest-table.component.html',
    styleUrls: ['./sender-rest-table.component.css']
})
export class SenderRestTableComponent implements OnInit, AfterViewInit {

    private displayedColumns: string[] = ['id', 'title', 'action'];
    private dataSource: MatTableDataSource<Sender>;
    private sendersSubject = new Subject<Sender[]>();

    @ViewChild(MatSort, {static: false})
    private sort: MatSort;

    @ViewChild(MatPaginator, {static: false})
    private paginator: MatPaginator;
    private senders: Sender[] = [];

    constructor(private senderService: SenderServiceImpl,
                private router: Router,
                private editSenderDialog: MatDialog) {
    }

    ngOnInit() {
        this.getAll();
        this.dataSource = new MatTableDataSource();
        this.sendersSubject.subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngAfterViewInit(): void {
        //   this.addTableObjects();
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
                    }
                }
            }
        )
        // this.reloadData();//не вызывается?
    }

    public deleteSender(sender: Sender): void {
        if (confirm("Удалить отправителя: id = " + sender.id + "; " + sender.title + "?")) {
            this.senderService.delete(sender.id).subscribe(
                data => {
                    console.log(data.valueOf());
                   // this.reloadData();
                    this.getAll();
                    alert(data.message);
                    this.sendersSubject.next(this.senders);
                },
                error => {
                    console.log(error.valueOf());
                    alert("Невозможно удалить отправителя: id = " + sender.id + "\n" + error.message);
                });
        }
    }

    private getAll(): void {
        console.log('getAll');
        this.senderService.getAll()
            .subscribe(data => {
                data.forEach((item, index) => {
                    this.senders.push(new Sender(item.id, item.title));
                });
                // this.senders.forEach((item, index) => {
                //     console.log("1senders № " + (index + 1) + "; id = " + item.id + "; title = " + item.title);
                // });
                this.sendersSubject.next(this.senders);
            });
        console.log(this.senders.length);
    }

    private reloadData(): void {
        console.log("reloadData()");

        /*
        this.senderService.getAll()
            .subscribe(data => {
              //  this.dataSource.data = data;
                this.senders = data;
                data.forEach((item, index) => {
                    console.log("senders № " + (index + 1) + "; id = " + item.id + "; title = " + item.title);
                })
            });
*/
        //      this.addTableObjects();
        /*
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

         */
    }

    /*
        private addTableObjects(): void {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        }

     */
}
