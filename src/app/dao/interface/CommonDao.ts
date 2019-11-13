import {Observable} from "rxjs";
import {CommonMessage} from "../../model/Common-message";

export interface CommonDao<T> {
    getAll(): Observable<T[]>;

    getById(id: number): Observable<T>;

    save(T): Observable<T>;

    update(T):Observable<T>;

    delete(id: number): Observable<CommonMessage>;
}
