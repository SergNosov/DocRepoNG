import {BehaviorSubject} from "rxjs";
import {Doctype} from "../model/Doctype";

export abstract class BaseService<T> {
    protected entitys: T[];
    entitysBehaviorSubject = new BehaviorSubject<T[]>(this.entitys);
    entityBehaviorSubject = new BehaviorSubject<T>(null);

    constructor(t:T[]){
        this.entitys = t;
        this.entitysBehaviorSubject.next(this.entitys);
        console.log(this.entitys);
    }

    delete(t: T){
        this.entitys.forEach( (item, index) => {
            if(item === t) this.entitys.splice(index,1);
        });
        this.entitysBehaviorSubject.next(this.entitys);
    }

    setEntityBehaviorSubject(t: T){
        this.entityBehaviorSubject.next(t);
    }

    abstract isEquals(x: T, y: T): boolean;

    abstract update(t: T);

    save(t: T) {
        this.entitys.push(t);
    }
}
