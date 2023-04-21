export const getAttributeOnHash = ( hash: string, attribute: string ) : string => {
    if(hash){
        const query = hash.replace('#','');
        let value = ''
        query.split('&').forEach((part) => {
            const item = part.split("=");
            if(item[0] === attribute){
                value = item[1]
            }
        })
        return value
    }
    return '' 
}

export default {
    getAttributeOnHash
}