import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {

   tempDoc = this.fb.group({
    id: [''],
    ndoc: [''],
    dateDoc: [''],
    docType: [''],
    senders: [''],
    title: [''],
    context: ['']
  });

  constructor ( private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.tempDoc);
  }
}
