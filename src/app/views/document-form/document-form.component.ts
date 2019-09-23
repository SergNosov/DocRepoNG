import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Doctype} from "../../model/Doctype";
import {DataHandlerService} from "../../service/data-handler.service";
import {Sender} from "../../model/Sender";

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {

   private doctypes: Doctype[];
   private senders: Sender[];

   private tempDoc = this.fb.group({
    id: [''],
    ndoc: [''],
    dateDoc: ['', Validators.required],
  //  docType: [Doctype, Validators.required],
    docType: [null,Validators.required],
    senders: [Sender, Validators.required],
    title: ['', Validators.required],
    context: ['']
  });

  constructor ( private fb: FormBuilder , private dataHandler: DataHandlerService) { }

  ngOnInit() {
      this.dataHandler.doctypeBehaviorSubject.subscribe( newDoctypes => this.doctypes = newDoctypes);
      this.dataHandler.senderBehaviorSubject.subscribe(newSenders => this.senders = newSenders);
  }

  onSubmit() {
    console.log(this.tempDoc);
  }
}
