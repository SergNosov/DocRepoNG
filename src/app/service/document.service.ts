import { Injectable} from '@angular/core';
import {TestData} from '../data/TestData';
import {BehaviorSubject} from 'rxjs';
import {Document} from "../model/Document";


@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    private documents: Document[];
    documentsBehaviorSubject = new BehaviorSubject<Document[]>(this.documents);
    documentBehaviorSubject = new BehaviorSubject<Document>(null);

    constructor() {
        this.documents = TestData.documents;
        this.documentsBehaviorSubject.next(this.documents);
    }

    deleteDocument(doc: Document) {
        this.documents.forEach( (item, index) => {
            if(item === doc) this.documents.splice(index,1);
        });
        this.documentsBehaviorSubject.next(this.documents);
    }

    setDocument(doc: Document){
        this.documentBehaviorSubject.next(doc);
        console.log("from setDocument in documentService: "+doc);
    }
}
