import { AuthRoutes } from "~/composables/auth/auth.config"

const compare = (arrRoutes:any[], path:string)=>{
    return arrRoutes.some((item)=>{
      if(item.regex){
         const re = new RegExp(item.regex.join('|'),'g')
         return re.test(path)
      }else{
        return item === path
      }
    })
}
export const isAuthRoute = (path:string)=>compare(AuthRoutes, path)