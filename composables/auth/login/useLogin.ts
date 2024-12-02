import { useAuthStore } from "../Auth.store";
import { useLoginService } from "./useLogin.service";
import {ToastEnum} from "~~/types"
export const useLogin = ()=>{
    const loading = ref(false)
    const error = ref("");
    const onError = (e)=>{
        if(e?.response?.status == 401){
            error.value = "نام کاربری یا رمز عبور اشتباه است."
        }else{
            error.value = "خطایی رخ داده است."
        }
    }
    const authStore = useAuthStore();
    const router = useRouter();
    const {showToast} = useToast()
    const {login} = useLoginService();
    const submit = (values)=>{
        loading.value = true;
        error.value = "";
        login(values, {ignorErrors:true, onError}).then((response)=>{
            if(response !== undefined){
                authStore.setToken(response.tokens)
                authStore.setIdentity(response.identity);
                showToast({message: "با موفقیت وارد شدید.", type: ToastEnum.success})
                router.replace("/admin/architectures/create")
            }
        }).finally(()=>{
            loading.value = false
        })

    }
    return {submit, loading, error}
}