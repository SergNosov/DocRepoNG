
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Sender} from "../model/Sender";
import {Observable} from "rxjs";
import {CommonMessage} from "../model/Common-message";

@Injectable({
    providedIn: 'root'
})
export class SenderServiceRest {
    private senderURL = 'http://localhost:8080/api/senders';

    constructor(private http:HttpClient) { }

    public getAllSenders() : Observable<Sender[]>{
        console.log("getAllSenders");
        return this.http.get<Sender[]>(this.senderURL);
    }

    public getById(id: number): Observable<Sender>{
        return this.http.get<Sender>(this.senderURL+'/'+id);
    }

    public delete(sender: Sender): Observable<CommonMessage> {
        return this.http.delete<CommonMessage>(this.senderURL+'/'+sender.id);
    }

    update(newSender: Sender): Observable<any> {
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        let options = { headers: headers };
        newSender.id=-123;
        const body ={id: newSender.id, title: newSender.title};
        return this.http.put(this.senderURL, body, options);
    }

    public isEquals(x: Sender, y: Sender): boolean {
        if (x === y) {
            return true; // if both x and y are null or undefined and exactly the same
        } else if (!(x instanceof Object) || !(y instanceof Object)) {
            return false; // if they are not strictly equal, they both need to be Objects
        } else if (x.constructor !== y.constructor) {
            // they must have the exact same prototype chain, the closest we can do is
            // test their constructor.
            return false;
        } else {
            for (const p in x) {
                if (!x.hasOwnProperty(p)) {
                    continue; // other properties were tested using x.constructor === y.constructor
                }
                if (!y.hasOwnProperty(p)) {
                    return false; // allows to compare x[ p ] and y[ p ] when set to undefined
                }
                if (x[p] === y[p]) {
                    continue; // if they have the same strict value or identity then they are equal
                }
                if (typeof (x[p]) !== 'object') {
                    return false; // Numbers, Strings, Functions, Booleans must be strictly equal
                }
                if (!this.isEquals(x[p], y[p])) {
                    return false;
                }
            }
            for (const p in y) {
                if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                    return false;
                }
            }
            return true;
        }
    }
}
