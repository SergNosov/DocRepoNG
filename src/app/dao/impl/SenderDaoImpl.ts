import {SenderDao} from "../interface/SenderDao";
import {Sender} from "../../model/Sender";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CommonMessage} from "../../model/Common-message";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class SenderDaoImpl implements SenderDao {
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
        console.log("senderDao.update body:"+body.id+";"+ body.title);
        let returnSender: Observable<Sender> = this.http.put<Sender>(this.senderURL, body, options);

        returnSender.subscribe(data => {
            let sender:Sender = data;
            console.log("senderDao.update returnSender:"+sender.id+";"+ sender.title);
        })
        return returnSender;
    }
}
