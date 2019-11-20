import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Document} from "../../model/Document";
import {DocumentsDaoImpl} from "../../dao/impl/DocumentsDaoImpl";
import {DoctypesServiceImpl} from "../../service_rest/impl/DoctypesServiceImpl";
import {SendersServiceImpl} from "../../service_rest/impl/SendersServiceImpl";
import {Doctype} from "../../model/Doctype";
import {Sender} from "../../model/Sender";
import {of} from "rxjs";

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
                private documentService: DocumentsDaoImpl,
                private doctypeService: DoctypesServiceImpl,
                private senderService: SendersServiceImpl,
                private router: Router,
                private activateRoute: ActivatedRoute
    ) {  }

    ngOnInit() {
        console.log('ngOnInit');
        this.tempDocFormData = this.fb.group({
            id: [''],
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
                    this.tempDoc = data;

                    const doctypeId:number = data.doctype.id;
                    this.setDoctypeToTempDoc(doctypeId);
                    this.setSendersToTempDoc();

                    this.tempDocFormData.setValue({
                        id: this.tempDoc.id,
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

    private setDoctypeToTempDoc(doctypeId: number): void {
        this.doctypes.forEach((item, index) => {
            if (item.id == doctypeId) {
                this.tempDoc.doctype = item;
            }
        });
    }

    private setSendersToTempDoc():void {
        let tempSenders: Sender[]=[];

        this.senders.forEach((item,index)=>{
            this.tempDoc.senders.forEach((tempDocSender,tempDocIndex)=>{
                if (item.id==tempDocSender.id){
                    tempSenders.push(item);
                }
            });
        });

        if (tempSenders.length>0) {
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

    }
}
