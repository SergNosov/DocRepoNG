
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Sender} from "../model/Sender";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';

@Injectable({
    providedIn: 'root'
})
export class SenderServiceRest {
    private senderURL = 'http://localhost:8080/api/senders';

    constructor(private http:HttpClient) { }

    public getAllSenders() : Observable<Sender[]>{
        console.log("getAllSenders");
        /*
        return this.http.get(this.allArticlesUrl)
            .map(this.extractData)
            .catch(this.handleError);
        */
        return this.http.get<Sender[]>(this.senderURL);
    }

    public delete(sender: Sender) {
        return this.http.delete(this.senderURL+'/'+sender.id);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }

    private handleError (error: Response | any) {
        console.error(error.message || error);
        return Observable.throw(error.status);
    }
}