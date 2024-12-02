import { useFetchApi } from "../api/useFetchApi"
import { IdentityDto } from "./Auth.dto";
// const beforeResponse = (response)=>{
//    if(response){
//     return response.data
//    }
// }
export const useIdentityService = ()=>{
    const fetchData = useFetchApi<IdentityDto, IdentityDto>(IdentityDto);
    return (params={})=>fetchData("/identity", {params},{setToken:true, goToLogin:false, toastError:true})
}