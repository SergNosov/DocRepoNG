import {DocumentsDao} from "../interface/DocumentsDao";
import {Observable} from "rxjs";
import {CommonMessage} from "../../model/Common-message";
import {Document} from "../../model/Document";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Doctype} from "../../model/Doctype";
import {BaseDao} from "../BaseDao";

@Injectable({
    providedIn: 'root'
})
export class DocumentsDaoImpl extends BaseDao implements DocumentsDao {

    private documentsURL = 'http://localhost:8080/api/documents';

    constructor(private http: HttpClient) {
        super();
    }

    delete(id: number): Observable<CommonMessage> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        return this.http.delete<CommonMessage>(this.documentsURL + '/' + id,{headers});
    }

    getAll(): Observable<Document[]> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        return this.http.get<Document[]>(this.documentsURL, {headers});
    }

    getById(id: number): Observable<Document> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        return this.http.get<Document>(this.documentsURL + '/' + id, {headers});
    }

    save(doc: Document): Observable<Document> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        const body = JSON.stringify(doc).replace(/_/g, '');
        return this.http.post<Document>(this.documentsURL, body, {headers});
    }

    update(doc: Document): Observable<Document> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        const body = JSON.stringify(doc).replace(/_/g, '');
        console.log("update body: " + body);
        return this.http.put<Document>(this.documentsURL, body, {headers});
    }
}
