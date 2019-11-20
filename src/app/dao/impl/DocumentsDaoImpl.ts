import {DocumentsDao} from "../interface/DocumentsDao";
import {Observable} from "rxjs";
import {CommonMessage} from "../../model/Common-message";
import {Document} from "../../model/Document";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Doctype} from "../../model/Doctype";

@Injectable({
    providedIn: 'root'
})
export class DocumentsDaoImpl implements DocumentsDao {

    private documentsURL = 'http://localhost:8080/api/documents';

    constructor(private http: HttpClient) {
    }

    delete(id: number): Observable<CommonMessage> {
        return this.http.delete<CommonMessage>(this.documentsURL + '/' + id);
    }

    getAll(): Observable<Document[]> {
        return this.http.get<Document[]>(this.documentsURL);
    }

    getById(id: number): Observable<Document> {
        return this.http.get<Document>(this.documentsURL + '/' + id);
    }

    save(document: Document): Observable<Document> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = {headers: headers};
        const body = {
            id: 0,
            num: document.number,
            date: document.docDate,
            title: document.title,
            doctype: {
                id: document.doctype.id,
                title: document.doctype.title
            },
            senders: document.senders,
            content: document.content
        };
        return this.http.post<Document>(this.documentsURL, body, options);
    }

    update(T): Observable<Document> {
        return undefined;
    }
}
