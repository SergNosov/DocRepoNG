import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonMessage} from "../../model/Common-message";
import {DoctypesDao} from "../interface/DoctypesDao";
import {Doctype} from "../../model/Doctype";
import {BaseDao} from "../BaseDao";

@Injectable({
    providedIn: 'root'
})
export class DoctypesDaoImpl extends BaseDao implements DoctypesDao {
    private doctypesURL = 'http://localhost:8080/api/doctypes';

    constructor(private http: HttpClient) {
        super();
    }

    delete(id: number): Observable<CommonMessage> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        return this.http.delete<CommonMessage>(this.doctypesURL + '/' + id,{headers});
    }

    getAll(): Observable<Doctype[]> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        return this.http.get<Doctype[]>(this.doctypesURL,{headers});
    }

    getById(id: number): Observable<Doctype> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        return this.http.get<Doctype>(this.doctypesURL + '/' + id,{headers});
    }

    save(doctype: Doctype): Observable<Doctype> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        const body = {id: 0, title: doctype.title};
        return this.http.post<Doctype>(this.doctypesURL, body, {headers});
    }

    update(doctype: Doctype): Observable<Doctype> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        const body = {id: doctype.id, title: doctype.title};
        return this.http.put<Doctype>(this.doctypesURL, body, {headers});
    }
}
