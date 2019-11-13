import {SenderDao} from "../../dao/interface/SenderDao";
import {SenderService} from "../interface/SenderService";
import {Observable} from "rxjs";
import {CommonMessage} from "../../model/Common-message";
import {Sender} from "../../model/Sender";
import {Injectable} from "@angular/core";
import {SenderDaoImpl} from "../../dao/impl/SenderDaoImpl";

@Injectable({
    providedIn: 'root'
})

export class SenderServiceImpl implements SenderService {

    constructor(private senderDao: SenderDaoImpl) {
    }

    delete(id: number): Observable<CommonMessage> {
        return this.senderDao.delete(id);
    }

    getAll(): Observable<Sender[]> {
        return this.senderDao.getAll();
    }

    getById(id: number): Observable<Sender> {
        return this.senderDao.getById(id);
    }

    saveOrUpdate(sender: Sender): Observable<Sender> {
        if (sender.id == 0) {
            return this.senderDao.save(sender);
        } else {
            return this.senderDao.update(sender);
        }
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
