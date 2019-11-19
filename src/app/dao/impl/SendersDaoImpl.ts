import {SendersDao} from "../interface/SendersDao";
import {Sender} from "../../model/Sender";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommonMessage} from "../../model/Common-message";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SendersDaoImpl implements SendersDao {
    private senderURL = 'http://localhost:8080/api/senders';

    constructor(private http: HttpClient) {
    }

    delete(id: number): Observable<CommonMessage> {
        return this.http.delete<CommonMessage>(this.senderURL + '/' + id);
    }

    getAll(): Observable<Sender[]> {
        return this.http.get<Sender[]>(this.senderURL);
    }

    getById(id: number): Observable<Sender> {
        return this.http.get<Sender>(this.senderURL + '/' + id);
    }

    save(sender: Sender): Observable<Sender> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = {headers: headers};
        const body = {id: 0, title: sender.title};
        return this.http.post<Sender>(this.senderURL, body, options);
    }

    update(sender: Sender): Observable<Sender> {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = {headers: headers};
        const body = {id: sender.id, title: sender.title};
        console.log("senderDao.update body:" + body.id + ";" + body.title);
        return this.http.put<Sender>(this.senderURL, body, options);
    }
}
