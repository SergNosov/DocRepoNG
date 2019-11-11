import { Component, OnInit } from '@angular/core';
import {Sender} from "../../model/Sender";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SenderServiceRest} from "../../service_rest/senderRest.service";

@Component({
  selector: 'app-sender-rest-form',
  templateUrl: './sender-rest-form.component.html',
  styleUrls: ['./sender-rest-form.component.css']
})
export class SenderRestFormComponent implements OnInit {

  private tempSender: Sender;
  private tempSenderFormData: FormGroup;

  constructor(private fb: FormBuilder,
              private senderServiceRest: SenderServiceRest,
              private router: Router) { }

  ngOnInit() {
    this.tempSenderFormData = this.fb.group({
      id: [''],
      title: ['', Validators.required]
    });

    if (this.tempSender != null) {
      this.tempSenderFormData.setValue({
        id: this.tempSender.id,
        title: this.tempSender.title
      });
    }
  }

  onSubmit() {
    if (!this.tempSenderFormData.invalid) {
      const newSender:Sender = new Sender(this.tempSenderFormData.get('id').value,
          this.tempSenderFormData.get('title').value);
      if (this.tempSender !=null) {
        //update
        // if(!this.senderService.isEquals(this.tempSender,newSender)){
        //   if(confirm("Сохранить изменения в свойствах отправителя c id="+this.tempSender.id)) {
        //     this.senderService.update(newSender);
        //   }
        // }
      } else {
        //insert
        if(confirm("Сохранить отправителя: "+newSender.title+"?")) {
        //  this.senderService.save(newSender);
        }
      }
      this.router.navigate(['/sendersRest']);
    } else {
      alert("не заполненны обязательные поля(*)");
    }
  }

}
