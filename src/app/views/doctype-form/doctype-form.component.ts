import { Component, OnInit } from '@angular/core';
import {Doctype} from "../../model/Doctype";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DoctypeService} from "../../service/doctype.service";
import {Router} from "@angular/router";
import {Document} from "../../model/Document";

@Component({
  selector: 'app-doctype-form',
  templateUrl: './doctype-form.component.html',
  styleUrls: ['./doctype-form.component.css']
})
export class DoctypeFormComponent implements OnInit {
  private tempDoctype: Doctype = null;
  private tempDoctypeFormData:  FormGroup;

  constructor(private fb: FormBuilder,
              private doctypeService: DoctypeService,
              private router: Router) { }

  ngOnInit() {
    this.doctypeService.entityBehaviorSubject.subscribe(newDoctype => this.tempDoctype=newDoctype);
    this.tempDoctypeFormData = this.fb.group({
      id: [''],
      title: ['', Validators.required]
    });

    if (this.tempDoctype != null) {
      this.tempDoctypeFormData.setValue({
        id: this.tempDoctype.id,
        title: this.tempDoctype.title
      });
    }
  }

  onSubmit() {
    if (!this.tempDoctypeFormData.invalid) {
      const newDoctype:Doctype = new Doctype(this.tempDoctypeFormData.get('id').value,
                                              this.tempDoctypeFormData.get('title').value);
      if (this.tempDoctype !=null) {
        if(!this.doctypeService.isEquals(this.tempDoctype,newDoctype)){
          if(confirm("Сохранить изменения в типе документа c id="+this.tempDoctype.id)) {
            this.doctypeService.update(newDoctype);
          }
        }
      } else {
        if(confirm("Сохранить новый тип документа: "+newDoctype.title+"?")) {
          this.doctypeService.save(newDoctype);
        }
      }
      this.router.navigate(['/doctypes']);
    } else {
      alert("не заполненны обязательные поля(*)");
    }
  }
}
