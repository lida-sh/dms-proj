import {acceptHMRUpdate, defineStore} from "pinia"
import type { AuthState, AuthTokens, Identity } from "./Auth.interface"
import { useIdentityService } from "./useIdentity.service"
import { useRefreshTokenService } from "./useRefreshToken.service"

const defaultState = ():AuthState=>({
   accessToken:null,
   refreshToken:null, 
   expiresIn: null,
   identity: {} as Identity,
   isRefreshing: false,
   isRefreshSuccess: false
})
export const useAuthStore  = defineStore("auth", {
    state: defaultState,
    getters: {
        isLoggedIn(state){
           return state.accessToken !== null
        },
        getFullName(state){
            return state.identity.first_name? `${state.identity.first_name} ${state.identity.last_name}` : state.identity.username
        },
        getToken(state){
            return state.accessToken
        },
        getRefreshToken(state){
            return state.refreshToken
        },
        getExpiresIn(state){
            return state.expiresIn
        },
        getLocalStoreAccessToken(){
           const local = localStorage.getItem("token");
           if(local){
            return JSON.parse(local).accessToken
           }else{
            return ""
           }
        }
    },
    actions:{
        setToken({accessToken, refreshToken, expiresIn}:AuthTokens, setLocalStorage:boolean = true){
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.expiresIn = expiresIn;
            setLocalStorage && localStorage.setItem("token", JSON.stringify({accessToken, refreshToken, expiresIn}))
        },
        initialStateFromLocalStorage(){
            const token = localStorage.getItem("token");
            if(token){
                this.setToken(JSON.parse(token), false)
            }
        },
        fetchAndSetIdentityIfLoggedin(){
           if(this.isLoggedIn){
            const fetchIdentity = useIdentityService()
            fetchIdentity().then((response)=>{
                if(response !== undefined){
                    console.log("ok", response)
                    this.setIdentity(response)
                }
            })
           }
        },
        doRefreshToken(){
            this.isRefreshing = true
            const refreshToken = useRefreshTokenService()
            return refreshToken(this.refreshToken!).then((response)=>{
                if(response !== undefined){{
                    this.setToken(response.tokens, true)
                    this.isRefreshSuccess = true
                }}
                return response
            }).finally(()=>{
                this.isRefreshing = false
            })
        },
        clearToken(deleteLocalToken = true){
            Object.assign(this, defaultState());
            deleteLocalToken && localStorage.removeItem("token")
        },
        setIdentity(identity: Identity){
            this.identity = identity
        }
    }
})
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}