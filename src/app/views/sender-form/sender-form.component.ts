import { Component, OnInit } from '@angular/core';
import {Sender} from "../../model/Sender";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SenderService} from "../../service/sender.service";

@Component({
  selector: 'app-sender-form',
  templateUrl: './sender-form.component.html',
  styleUrls: ['./sender-form.component.css']
})
export class SenderFormComponent implements OnInit {

  private tempSender: Sender;
  private tempSenderFormData: FormGroup;


  constructor(private fb: FormBuilder,
              private senderService: SenderService,
              private router: Router) { }

  ngOnInit() {
    this.senderService.entityBehaviorSubject.subscribe(newSender => this.tempSender=newSender);
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
        if(!this.senderService.isEquals(this.tempSender,newSender)){
          if(confirm("Сохранить изменения в свойствах отправителя c id="+this.tempSender.id)) {
            this.senderService.update(newSender);
          }
        }
      } else {
        if(confirm("Сохранить отправителя: "+newSender.title+"?")) {
          this.senderService.save(newSender);
        }
      }
      this.router.navigate(['/senders']);
    } else {
      alert("не заполненны обязательные поля(*)");
    }
  }

}
