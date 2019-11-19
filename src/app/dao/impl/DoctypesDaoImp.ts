import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommonMessage} from "../../model/Common-message";
import {DoctypesDao} from "../interface/DoctypesDao";
import {Doctype} from "../../model/Doctype";

@Injectable({
    providedIn: 'root'
})
export class DoctypesDaoImpl implements DoctypesDao {
    private doctypesURL = 'http://localhost:8080/api/doctypes';

    constructor(private http: HttpClient) {
    }

    delete(id: number): Observable<CommonMessage> {
        return this.http.delete<CommonMessage>(this.doctypesURL + '/' + id);
    }

    getAll(): Observable<Doctype[]> {
        return this.http.get<Doctype[]>(this.doctypesURL);
    }

    getById(id: number): Observable<Doctype> {
        return this.http.get<Doctype>(this.doctypesURL + '/' + id);
    }

    save(doctype: Doctype): Observable<Doctype> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = {headers: headers};
        const body = {id: 0, title: doctype.title};
        return this.http.post<Doctype>(this.doctypesURL, body, options);
    }

    update(doctype: Doctype): Observable<Doctype> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = {headers: headers};
        const body = {id: doctype.id, title: doctype.title};
        return this.http.put<Doctype>(this.doctypesURL, body, options);
    }
}
