import { Component, OnInit } from '@angular/core';
import {Sender} from "../../model/Sender";
import {DataService} from "../../service/data.service";
import {SenderService} from "../../service/sender.service";

@Component({
  selector: 'app-sender-table',
  templateUrl: './sender-table.component.html',
  styleUrls: ['./sender-table.component.css']
})
export class SenderTableComponent implements OnInit {

  private senders: Sender[];

  constructor(private senderService: SenderService) { }

  ngOnInit() {
    this.senderService.entitysBehaviorSubject.subscribe(newSenders => this.senders = newSenders);
  }

  editSender(sender: Sender) {

  }

  deleteSender(sender: Sender) {

  }
}
