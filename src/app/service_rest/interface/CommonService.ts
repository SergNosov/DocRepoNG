import {Observable} from "rxjs";
import {CommonMessage} from "../../model/Common-message";
import {Sender} from "../../model/Sender";

export interface CommonService<T> {
    getAll(): Observable<T[]>;

    getById(id: number): Observable<T>;

    saveOrUpdate(T): Observable<T>;

    delete(id: number): Observable<CommonMessage>;

    isEquals(x: T, y: T): boolean;
}
