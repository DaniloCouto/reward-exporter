export const TOKEN_KEY = "TOKEN"


export const setLocalStorage = (key : string, value: string) => {
    if(window){
        window.localStorage.setItem(key, value)
    }
}

export const getLocalStorage = (key : string) : string | null => {
    if(window){
        return window.localStorage.getItem(key)
    }
    return ''
}

