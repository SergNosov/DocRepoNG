import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Doctype} from "../../model/Doctype";
import {DataService} from "../../service/data.service";
import {Sender} from "../../model/Sender";
import {DocumentService} from "../../service/document.service";
import {Document} from "../../model/Document";

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {
   private tempDoc: Document;
   private doctypes: Doctype[];
   private senders: Sender[];

   private tempDocFormData:  FormGroup;

  constructor ( private fb: FormBuilder,
                private dataHandler: DataService,
                private documentService: DocumentService) { }

  ngOnInit() {
      this.dataHandler.doctypeBehaviorSubject.subscribe( newDoctypes => this.doctypes = newDoctypes);
      this.dataHandler.senderBehaviorSubject.subscribe(newSenders => this.senders = newSenders);
      this.documentService.documentBehaviorSubject.subscribe( doc => this.tempDoc = doc);

      this.tempDocFormData = this.fb.group({
          id: [''],
          ndoc: [''],
          dateDoc: ['', Validators.required],
          docType: [null,Validators.required],
          senders: [null, Validators.required],
          title: ['', Validators.required],
          context: ['']
      });

      if (this.tempDoc !=null) {

          this.tempDocFormData.setValue({
              id: this.tempDoc.id,
              ndoc: this.tempDoc.num,
              dateDoc: this.formatDate(this.tempDoc.date),
              docType: this.tempDoc.doctype,
              senders: this.tempDoc.senders,
              title: this.tempDoc.title,
              context: this.tempDoc.context
          });
      }
  }

  onSubmit() {
    if (!this.tempDocFormData.invalid) {
        console.log(this.tempDocFormData.value);
    } else {
        alert("не заполненны обязательные поля(*)");
    }
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
  }
}
