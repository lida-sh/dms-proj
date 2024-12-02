import {FetchError} from "ohmyfetch";
export interface FetchCustomConfig {
    setToken?:boolean,
    goToLogin?:boolean,
    ignorErrors?:boolean,
    onError?: (e:FetchError)=>void,
    onValidationFailed?: (errors: Record<string, string>, e:FetchError)=>void,
    setErrors?: (errors: {[key:string]:string})=>void,
    toastError?:boolean,
    debug?:boolean,
    toastValidationFields?:string[],
    beforeResponse?:Function

}


  