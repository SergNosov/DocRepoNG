import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthToken} from "../model/AuthToken";
import {ApiResponse} from "../model/api.response";

@Injectable({
    providedIn: 'root'
})

export class TokenService  {
    private generateTokenURL = 'http://localhost:8080/token/generate-token';

    constructor(private http: HttpClient) { }

    login(loginPayload) : Observable<ApiResponse> {
        return this.http.post<ApiResponse>(this.generateTokenURL, loginPayload);
    }
}
