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

export const formatCurrency = (amount, decimalPlaces = 0, currency = 'IDR') => 
    Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: decimalPlaces,
    }).format(amount)

export const removeFromArray = (needle, haystack = []) => 
    haystack.filter(val => val !== needle)

export const truncateString = (string, length = 12) => 
    string.length > length ? `${string.substring(0, length)}...` : string;

export const chunkArray = (array, chunkSize = 1000) => {
    let tempArray = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        tempArray.push(array.slice(i, i + chunkSize));
    }
    return tempArray;
}

export const setTheme = (theme) => {
    if (theme === 'auto') {
        localStorage.removeItem('theme')
    } else {
        localStorage.setItem('theme', theme)
    }
    if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

export const splitString = (string = "", firstDigits = 8, lastDigits = 4) => {
    if (string.length > 16) {
        let first = string.substring(0, firstDigits);
        let last = string.substring(string.length - lastDigits);
        return first + "..." + last;
    }
    return string;
}

export const basename = (path) => path.split('/').reverse()[0];