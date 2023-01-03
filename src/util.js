export const mergeProps = (props, ...items) => {
    return Object.assign({}, props, ...items)
}

export const searchString = (needle, haystack) => {
    return haystack
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(needle.toLowerCase().replace(/\s+/g, ''))
}

export const objectToQueryString = (obj) => {
    let str = []
    let keys = Object.keys(obj)
    keys.forEach(x => {
        str.push(`${x}=${obj[x]}`)
    })
    return str.join('&')
}

export const checkObjectUndefined = (obj) => {
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i ++) {
        if (typeof obj[keys[i]] === 'undefined') return false
    }
    return true
}
export const randomString = (len) => {
    return Math.random().toString(36).substr(2, len);
}

export const formatIDR = (amount, decimalPlaces = 0) => {
    return Intl.NumberFormat("id-ID", {
        style: 'currency',
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: decimalPlaces,
    }).format(amount)
}