import { Component, OnInit } from '@angular/core';
import {Sender} from "../../model/Sender";
import {SenderServiceRest} from "../../service_rest/senderRest.service";
import {CommonMessage} from "../../model/common-message";

@Component({
  selector: 'app-sender-rest-table',
  templateUrl: './sender-rest-table.component.html',
  styleUrls: ['./sender-rest-table.component.css']
})
export class SenderRestTableComponent implements OnInit {

  private senders: Sender[];
  private commonMessage: CommonMessage[];

  constructor(private senderServiceRest: SenderServiceRest) { }

  ngOnInit() {
    this.senderServiceRest.getAllSenders()
        .subscribe(data => {this.senders = data})
  }

  public newSender() {
  }

  public editSender(sender: Sender){
  }

  public deleteSender(sender: Sender) {
    if(confirm("Удалить отправителя: id="+sender.id+"; "+sender.title+"?")) {
      this.senderServiceRest.delete(sender).subscribe(data => {
        this.senders.filter(s => s !== sender);
      });
    }
  }

}
