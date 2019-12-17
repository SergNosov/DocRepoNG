export abstract class BaseDao{
    protected token='';

    protected constructor() {
        if(window.localStorage.getItem('token')) {
            this.token = window.localStorage.getItem('token');
        }
    }
}
