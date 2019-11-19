import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Doctype} from "../../model/Doctype";
import {DataService} from "../../service/data.service";
import {Sender} from "../../model/Sender";
import {DocumentService} from "../../service/document.service";
import {Document} from "../../model/Document";
import {Router} from "@angular/router";
import {DoctypeService} from "../../service/doctype.service";
import {SenderService} from "../../service/sender.service";

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {
  private tempDoc: Document = null;
  private doctypes: Doctype[];
  private senders: Sender[];
  private tempDocFormData:  FormGroup;
  private forBarCode:String;
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = 'Techiediaries';

  constructor ( private fb: FormBuilder,
                private doctypeService: DoctypeService,
                private senderService: SenderService,
                private documentService: DocumentService,
                private router: Router) { }

  ngOnInit() {
      this.doctypeService.entitysBehaviorSubject.subscribe( newDoctypes => this.doctypes = newDoctypes);
      this.senderService.entitysBehaviorSubject.subscribe(newSenders => this.senders = newSenders);
      this.documentService.entityBehaviorSubject.subscribe( doc => this.tempDoc = doc);

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
              dateDoc: this.dateToString(this.tempDoc.date),
              docType: this.tempDoc.doctype,
              senders: this.tempDoc.senders,
              title: this.tempDoc.title,
              context: this.tempDoc.content
          });
          this.forBarCode = this.tempDoc.toString();
      }
  }

  onSubmit() {
    if (!this.tempDocFormData.invalid) {
        const newDoc:Document = new Document(this.tempDocFormData.get('id').value,
                                                new Date(this.tempDocFormData.get('dateDoc').value),
                                                this.tempDocFormData.get('title').value,
                                                this.tempDocFormData.get('docType').value,
                                                this.tempDocFormData.get('senders').value,
                                                this.tempDocFormData.get('ndoc').value,
                                                this.tempDocFormData.get('context').value);
        if (this.tempDoc !=null) {
            if(!this.documentService.isEquals(this.tempDoc,newDoc)){
                if(confirm("Сохранить изменения в документе c id="+this.tempDoc.id)) {
                    this.documentService.update(newDoc);
                }
            }
        } else {
            if(confirm("Сохранить новый документ: "+newDoc.title+" № "+newDoc.num + " от "+newDoc.date+ "?")) {
                this.documentService.save(newDoc);
            }
        }
        this.router.navigate(['/documents']);
    } else {
        alert("не заполненны обязательные поля(*)");
    }
  }

  get BarcodValue(){
      return   this.tempDoc.id;
  }
  private dateToString(date): string {
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
