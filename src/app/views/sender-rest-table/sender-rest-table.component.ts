import {Component, OnInit} from '@angular/core';
import {Sender} from "../../model/Sender";
import {SenderServiceRest} from "../../service_rest/senderRest.service";
import {CommonMessage} from "../../model/common-message";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-sender-rest-table',
    templateUrl: './sender-rest-table.component.html',
    styleUrls: ['./sender-rest-table.component.css']
})
export class SenderRestTableComponent implements OnInit {

    private senders: Observable<Sender[]>;
    private commonMessage: Observable<CommonMessage>;
    private displayedColumns: string[] = ['num','id','title','action'];
    private dataSourse: MatTableDataSource<Sender>;

    constructor(private senderServiceRest: SenderServiceRest) {
    }

    ngOnInit() {
        this.reloadData();
        this.dataSourse = new MatTableDataSource();
        /*
        this.senderServiceRest.getAllSenders()
            .subscribe(data => {this.senders = data})
         */
    }

    public newSender() {
    }

    public editSender(sender: Sender) {
    }

    public deleteSender(sender: Sender) {
        if (confirm("Удалить отправителя: id = " + sender.id + "; " + sender.title + "?")) {
            this.senderServiceRest.delete(sender).subscribe(
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

    private reloadData() {
        this.senders = this.senderServiceRest.getAllSenders();

         this.senderServiceRest.getAllSenders()
             .subscribe(data => {this.dataSourse.data = data})
    }
}
