import { Fdata } from './fdata';
import { UserquestionnaireListe } from './userquestionnaireListe';

export class User{
    constructor(public id:number,public data:Array<Fdata>,public questionnaireListe:Array<UserquestionnaireListe>){}
}