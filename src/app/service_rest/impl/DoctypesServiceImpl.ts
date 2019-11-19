import {Observable} from "rxjs";
import {CommonMessage} from "../../model/Common-message";
import {Injectable} from "@angular/core";
import {DoctypesService} from "../interface/DoctypesService";
import {DoctypesDaoImpl} from "../../dao/impl/DoctypesDaoImp";
import {Doctype} from "../../model/Doctype";

@Injectable({
    providedIn: 'root'
})

export class DoctypesServiceImpl implements DoctypesService {

    constructor(private doctypeDao: DoctypesDaoImpl) {
    }

    delete(id: number): Observable<CommonMessage> {
        return this.doctypeDao.delete(id);
    }

    getAll(): Observable<Doctype[]> {
        return this.doctypeDao.getAll();
    }

    getById(id: number): Observable<Doctype> {
        return this.doctypeDao.getById(id);
    }

    saveOrUpdate(doctype: Doctype): Observable<Doctype> {
        if (doctype.id == 0) {
            return this.doctypeDao.save(doctype);
        } else {
            return this.doctypeDao.update(doctype);
        }
    }

    public isEquals(x: Doctype, y: Doctype): boolean {
        //  console.log('x: '+x.id+';'+'x.title: '+x.title+ ' ; '+'y: '+y.id+';'+'y.title: '+y.title);
        if (x === y) {
            return true; // if both x and y are null or undefined and exactly the same
            //  console.log("7");
        } else if (!(x instanceof Object) || !(y instanceof Object)) {
            //   console.log("1");
            return false; // if they are not strictly equal, they both need to be Objects
        } else if (x.constructor !== y.constructor) {
            // they must have the exact same prototype chain, the closest we can do is
            // test their constructor.
            //  console.log("2");
            //console.log("x:"+x.constructor +'\n'+"y:"+y.constructor );
            return false;
        } else {
            for (const p in x) {
                if (!x.hasOwnProperty(p)) {
                    continue; // other properties were tested using x.constructor === y.constructor
                }
                if (!y.hasOwnProperty(p)) {
                    //  console.log("3");
                    return false; // allows to compare x[ p ] and y[ p ] when set to undefined
                }
                if (x[p] === y[p]) {
                    // console.log('x[p]: '+x[p]+ ';'+'y[p]: '+y[p]);
                    continue; // if they have the same strict value or identity then they are equal
                }
                if (typeof (x[p]) !== 'object') {
                    // console.log("4");
                    return false; // Numbers, Strings, Functions, Booleans must be strictly equal
                }
                if (!this.isEquals(x[p], y[p])) {
                    // console.log("5");
                    return false;
                }
            }
            for (const p in y) {
                if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                    // console.log("6");
                    return false;
                }
            }
            console.log('изменений нет:'+'\n'+'x: '+x.id+';'+'x.title: '+x.title+ ' ; '+'y: '+y.id+';'+'y.title: '+y.title);
            return true;
        }
    }
}
