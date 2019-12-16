import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthToken} from "../model/AuthToken";

@Injectable({
    providedIn: 'root'
})

export class TokenService  {
    private generateTokenURL = 'http://localhost:8080/api/token/generate-token';

    constructor(private http: HttpClient) { }

    login(loginPayload) : Observable<AuthToken> {
        const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
        const options = {headers: headers};
        return this.http.post<AuthToken>(this.generateTokenURL, loginPayload,options);
    }
}
