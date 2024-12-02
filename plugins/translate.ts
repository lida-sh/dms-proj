import { string } from "yup"
import fa from "~~/i18n/fa"
export default defineNuxtPlugin(() => {
    const getText = (field:string) => {
        const resolvePath = (object:any, path:string, defaultValue:string) => path.split('.').reduce((o, p) => (o ? o[p] : defaultValue), object)
        return resolvePath(fa.messages, field, "")
    }
    const replaceParams = (text:string, params:any) => {
        Object.keys(params).forEach((key) => {
            text = text.replace('{' + key + '}', params[key])
        })
        return text
    }
    const translate = (field: string, params: Record<string, string> = {}):string => {
        const text = getText(field)
        const res = replaceParams(text, params)
        if (res == undefined || res == "") {
            console.error(field, " is not translated")
        }
        return res

    }
    return {
         provide:{
            t:translate
        }
    }
})