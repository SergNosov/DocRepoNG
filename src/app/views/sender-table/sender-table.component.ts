import { Component, OnInit } from '@angular/core';
import {Sender} from "../../model/Sender";
import {DataService} from "../../service/data.service";
import {SenderService} from "../../service/sender.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sender-table',
  templateUrl: './sender-table.component.html',
  styleUrls: ['./sender-table.component.css']
})
export class SenderTableComponent implements OnInit {

  private senders: Sender[];

  constructor(private senderService: SenderService,
              private router: Router) { }

  ngOnInit() {
    this.senderService.entitysBehaviorSubject.subscribe(newSenders => this.senders = newSenders);
  }

  editSender(sender: Sender) {
    this.senderService.setEntityBehaviorSubject(sender);
    this.router.navigate(['/sender']);
  }

  deleteSender(sender: Sender) {
    if(confirm("Удалить отправителя: id="+sender.id+"; "+sender.title+"?")) {
      this.senderService.delete(sender);
    }
  }

    newSender() {
      this.senderService.setEntityBehaviorSubject(null);
      this.router.navigate(['/sender']);
    }
}
