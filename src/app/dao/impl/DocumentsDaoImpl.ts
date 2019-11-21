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

    save(doc: Document): Observable<Document> {
        const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        const options = {headers: headers};
        const body = JSON.stringify(doc).replace(/_/g,'');
        return this.http.post<Document>(this.documentsURL, body, options);
    }

    update(doc: Document): Observable<Document> {
        const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        const options = {headers: headers};
        const body = JSON.stringify(doc).replace(/_/g,'');
        console.log("update body: "+body);

        return this.http.put<Document>(this.documentsURL, body, options);
    }
}
