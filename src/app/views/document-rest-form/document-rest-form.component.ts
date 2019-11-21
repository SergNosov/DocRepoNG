import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Document} from "../../model/Document";
import {DoctypesServiceImpl} from "../../service_rest/impl/DoctypesServiceImpl";
import {SendersServiceImpl} from "../../service_rest/impl/SendersServiceImpl";
import {Doctype} from "../../model/Doctype";
import {Sender} from "../../model/Sender";
import {DocumentServiceImpl} from "../../service_rest/impl/DocumentServiceImpl";

@Component({
    selector: 'app-document-rest-form',
    templateUrl: './document-rest-form.component.html',
    styleUrls: ['./document-rest-form.component.css']
})
export class DocumentRestFormComponent implements OnInit {
    private tempDoc: Document = new Document(0, new Date('00001.01.01'), '', new Doctype(3, "Заявление"), undefined);
    private doctypes: Doctype[] = [];
    private senders: Sender[] = [];
    private tempDocFormData: FormGroup;

    constructor(private fb: FormBuilder,
                private documentService: DocumentServiceImpl,
                private doctypeService: DoctypesServiceImpl,
                private senderService: SendersServiceImpl,
                private router: Router,
                private activateRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        console.log('ngOnInit');
        this.tempDocFormData = this.fb.group({
            ndoc: [''],
            dateDoc: ['', Validators.required],
            docType: [null, Validators.required],
            senders: [null, Validators.required],
            title: ['', Validators.required],
            context: ['']
        });

        this.doctypeService.getAll().subscribe(data => {
            data.forEach((item, index) => {
                this.doctypes.push(new Doctype(item.id, item.title));
            });
        });

        this.senderService.getAll().subscribe(data => {
            data.forEach((item, index) => {
                this.senders.push(new Sender(item.id, item.title));
            })
        });

        const id = this.activateRoute.snapshot.params['id'];
        if (id != 0) {
            this.documentService.getById(id).subscribe(
                data => {
                    this.tempDoc = new Document(
                        data.id,
                        //new Date(data.docDate),
                        data.docDate,
                        data.title,
                        data.doctype,
                        data.senders,
                        data.number,
                        data.content
                    );
                    this.tuningTempDoc();

                    this.tempDocFormData.setValue({
                        ndoc: this.tempDoc.number,
                        dateDoc: this.dateToString(this.tempDoc.docDate),
                        docType: this.tempDoc.doctype,
                        senders: this.tempDoc.senders,
                        title: this.tempDoc.title,
                        context: this.tempDoc.content
                    });
                },
                error => {
                    console.log(error.valueOf());
                    alert("не найден документ: id = " + id + "\n" + error.message); //todo сообщение об ошибках сделать в отдельном компоненте
                    this.router.navigate(['/documentsRest']);
                });
        }
    }

    private tuningTempDoc() {
        this.setDoctypeInTempDoc();
        this.setSendersInTempDoc();
    }

    private setDoctypeInTempDoc(): void {
        console.log('this.doctypes.length: ' + this.doctypes.length);
        this.doctypes.forEach((item, index) => {
            if (item.id == this.tempDoc.doctype.id) {
                this.tempDoc.doctype = item;
            }
        });
    }

    private setSendersInTempDoc(): void {
        console.log('this.senders.length: ' + this.senders.length);
        let tempSenders: Sender[] = [];

        this.senders.forEach((item, index) => {
            this.tempDoc.senders.forEach((tempDocSender, tempDocIndex) => {
                if (item.id == tempDocSender.id) {
                    tempSenders.push(item);
                }
            });
        });

        if (tempSenders.length > 0) {
            this.tempDoc.senders = tempSenders;
        }
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

    onSubmit() {
        if (!this.tempDocFormData.invalid) {
            let tempDate:Date =  new Date(this.tempDocFormData.get('dateDoc').value);
            const newDoc: Document = new Document(
                this.tempDoc.id,
                new Date(this.tempDocFormData.get('dateDoc').value),
                this.tempDocFormData.get('title').value,
                this.tempDocFormData.get('docType').value,
                this.tempDocFormData.get('senders').value,
                this.tempDocFormData.get('ndoc').value,
                this.tempDocFormData.get('context').value);

            console.log("newDoc from component:" + newDoc.toString());

            if (this.tempDoc.id != 0) {
               // if (!this.documentService.isEquals(newDoc, this.tempDoc)) {
                if (!this.documentService.isEq(newDoc, this.tempDoc)) {
                    if (confirm("Сохранить изменения в документе c id=" + this.tempDoc.id)) {
                        this.documentService.saveOrUpdate(newDoc).subscribe(data=>{
                                alert("Документ с id:"+data.id+"изменен.");
                        },
                            error => {
                                alert("Ошибка при обновлении документа с id:"+this.tempDoc.id+";\n"+
                                error.message);
                            });
                    }
                }
            } else {
                if (confirm("Сохранить новый документ: " + newDoc.title + " № " + newDoc.number + " от " + newDoc.docDate + "?")) {
                    this.documentService.saveOrUpdate(newDoc).subscribe(data=>{
                        alert("Документ с id:"+data.id+"сохранен.");
                    });
                }
            }
            this.router.navigate(['/documentsRest']);
        } else {
            alert("не заполненны обязательные поля(*)");
        }

    }
}
