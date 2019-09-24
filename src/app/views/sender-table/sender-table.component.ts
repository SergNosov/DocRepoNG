import { Component, OnInit } from '@angular/core';
import {Sender} from "../../model/Sender";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-sender-table',
  templateUrl: './sender-table.component.html',
  styleUrls: ['./sender-table.component.css']
})
export class SenderTableComponent implements OnInit {

  private senders: Sender[];

  constructor(private dataHandler: DataService) { }

  ngOnInit() {
    this.dataHandler.senderBehaviorSubject.subscribe(newSenders => this.senders = newSenders);
  }

}
