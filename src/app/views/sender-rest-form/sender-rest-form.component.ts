import {Component, OnInit} from '@angular/core';
import {Sender} from "../../model/Sender";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SenderServiceRest} from "../../service_rest/senderRest.service";

@Component({
    selector: 'app-sender-rest-form',
    templateUrl: './sender-rest-form.component.html',
    styleUrls: ['./sender-rest-form.component.css']
})
export class SenderRestFormComponent implements OnInit {

    private tempSender: Sender = new Sender(0, '');
    private tempSenderFormData: FormGroup;

    constructor(private fb: FormBuilder,
                private senderServiceRest: SenderServiceRest,
                private router: Router,
                private activateRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.tempSenderFormData = this.fb.group({
            title: ['', Validators.required]
        });

        const id = this.activateRoute.snapshot.params['id'];

        if (id != 0) {
            this.senderServiceRest.getById(id).subscribe(
                data => {
                    this.tempSender = new Sender(data.id, data.title);
                    this.tempSenderFormData.setValue({
                        title: this.tempSender.title
                    });
                }, error => {
                    console.log(error.valueOf());
                    alert("не найден отправитель: id = " + id + "\n" + error.message);
                    this.router.navigate(['/sendersRest']);
                    //todo отработать вариант с переадресацией
                });
        }
    }

    onSubmit() {
        if (!this.tempSenderFormData.invalid) {
            const newSender: Sender = new Sender(this.tempSender.id,
                this.tempSenderFormData.get('title').value);
            if (this.tempSender.id != 0) {
                if (!this.senderServiceRest.isEquals(this.tempSender, newSender)) {
                    if (confirm("Сохранить изменения в свойствах отправителя c id=" + this.tempSender.id)) {
                       this.saveOrUpdate(newSender);
                    }
                }
            } else {
                if (confirm("Сохранить отправителя: " + newSender.title + "?")) {
                    this.saveOrUpdate(newSender);
                }
            }
            this.router.navigate(['/sendersRest']);
        } else {
            alert("не заполненны обязательные поля(*)");
        }
    }

    private saveOrUpdate(newSender: Sender):void{
        this.senderServiceRest.saveOrUpdate(newSender).subscribe(
            data => {
            },
            error => {
                alert("Ошибка при сохранении sender.id:" + newSender.id + "\n" + error.error.message);
                console.log(error.valueOf());
                //todo сообщение об ошибках сделать в отдельном компоненте
            }
        );
    }
}
