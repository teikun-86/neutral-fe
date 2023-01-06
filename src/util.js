export const mergeProps = (props, ...items) => {
    return Object.assign({}, props, ...items)
}

export const searchString = (needle, haystack) =>
    haystack
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(needle.toLowerCase().replace(/\s+/g, ''))

export const objectToQueryString = (obj) =>
    Object.keys(obj)
        .map(key => `${key}=${obj[key]}`)
        .join('&');

export const checkObjectUndefined = (obj) =>
    !Object.values(obj).includes(undefined)

export const randomString = (len) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const formatIDR = (amount, decimalPlaces = 0) => {
    return Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: decimalPlaces,
    }).format(amount)
}

export const removeFromArray = (needle, haystack = []) => 
    haystack.filter(val => val !== needle)

export const truncateString = (string, length = 12) => 
    string.length > length ? `${string.substring(0, length)}...` : string;