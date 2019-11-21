import {DocumentsService} from "../interface/DocumentsService";
import {Observable} from "rxjs";
import {CommonMessage} from "../../model/Common-message";
import {Document} from "../../model/Document";
import {Injectable} from "@angular/core";
import {DocumentsDaoImpl} from "../../dao/impl/DocumentsDaoImpl";

@Injectable({
    providedIn: 'root'
})

export class DocumentServiceImpl implements DocumentsService {

    constructor(private documentsDao: DocumentsDaoImpl) {
    }

    delete(id: number): Observable<CommonMessage> {
        return this.documentsDao.delete(id);
    }

    getAll(): Observable<Document[]> {
        return this.documentsDao.getAll();
    }

    getById(id: number): Observable<Document> {
        return this.documentsDao.getById(id);
    }

    saveOrUpdate(doc: Document): Observable<Document> {
        if (doc.id == 0) {
            return this.documentsDao.save(doc);
        } else {
            return this.documentsDao.update(doc);
        }
    }

    public isEquals(x: Document, y: Document): boolean {
        //  console.log('x: '+x.id+';'+'x.title: '+x.title+ ' ; '+'y: '+y.id+';'+'y.title: '+y.title);
        if (x === y) {
            return true; // if both x and y are null or undefined and exactly the same
            console.log("7");
        } else if (!(x instanceof Object) || !(y instanceof Object)) {
            console.log("1");
            return false; // if they are not strictly equal, they both need to be Objects
        } else if (x.constructor !== y.constructor) {
            // they must have the exact same prototype chain, the closest we can do is
            // test their constructor.
            console.log("2");
            console.log("x:" + x.constructor + '\n' + "y:" + y.constructor);
            return false;
        } else {
            for (const p in x) {
                if (!x.hasOwnProperty(p)) {
                    continue; // other properties were tested using x.constructor === y.constructor
                }
                if (!y.hasOwnProperty(p)) {
                    console.log("3");
                    return false; // allows to compare x[ p ] and y[ p ] when set to undefined
                }
                if (x[p] === y[p]) {
                    console.log('x[p]: ' + x[p] + ';' + 'y[p]: ' + y[p]);
                    continue; // if they have the same strict value or identity then they are equal
                }
                if (typeof (x[p]) !== 'object') {
                    console.log("4. typeof x[p]:" + typeof (x[p]));
                    console.log("4. x[p]:" + x[p]);
                    console.log("4");
                    return false; // Numbers, Strings, Functions, Booleans must be strictly equal
                }
                if (!this.isEquals(x[p], y[p])) {
                    console.log("5. x[p]:"+x[p]);
                    console.log("5. typeof x[p]:"+typeof x[p]);
                    console.log("5. y[p]:"+y[p]);
                    console.log("5. typeof y[p]:"+typeof y[p]);
                    console.log("5. this.isEquals(x[p], y[p]): "+this.isEquals(x[p], y[p]));
                    console.log("5");
                    return false;
                }
            }
            for (const p in y) {
                if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
                    console.log("6");
                    return false;
                }
            }
            console.log('изменений нет:' + '\n' + 'x: ' + x.id + ';' + 'x.title: ' + x.title + ' ; ' + 'y: ' + y.id + ';' + 'y.title: ' + y.title);
            return true;
        }
    }

    public isEq(x: Document, y: Document):boolean{

        if (x.id != y.id){
            return false;
        }

        if (x.number != y.number){
            return false;
        }

        if (x.docDate != y.docDate){
            return false;
        }

        if (x.title != y.title){
            return false;
        }
        if (x.content != y.content){
            return false;
        }
        if (x.doctype.title != y.doctype.title){
            return false;
        }

        if (x.senders.length != y.senders.length){
            return false;
        }

        let xySenders:boolean = false;
        x.senders.forEach((itemX,indexX)=>{
            y.senders.forEach((itemY,indexY)=>{
                if (itemX.title==itemY.title){
                    xySenders=true;
                }
            })
        })

        return xySenders;
    }
}
