import {SendersDao} from "../interface/SendersDao";
import {Sender} from "../../model/Sender";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommonMessage} from "../../model/Common-message";
import {Injectable} from "@angular/core";
import {BaseDao} from "../BaseDao";

@Injectable({
    providedIn: 'root'
})

export class SendersDaoImpl extends BaseDao implements SendersDao {
    private senderURL = 'http://localhost:8080/api/senders';

    constructor(private http: HttpClient) {
        super();
    }

    delete(id: number): Observable<CommonMessage> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        return this.http.delete<CommonMessage>(this.senderURL + '/' + id,{headers});
    }

    getAll(): Observable<Sender[]> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        return this.http.get<Sender[]>(this.senderURL,{headers});
    }

    getById(id: number): Observable<Sender> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        return this.http.get<Sender>(this.senderURL + '/' + id,{headers});
    }

    save(sender: Sender): Observable<Sender> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        const body = {id: 0, title: sender.title};
        return this.http.post<Sender>(this.senderURL, body, {headers});
    }

    update(sender: Sender): Observable<Sender> {
        const headers = new HttpHeaders({Authorization: 'Bearer ' + this.token});
        const body = {id: sender.id, title: sender.title};
        return this.http.put<Sender>(this.senderURL, body, {headers});
    }
}
