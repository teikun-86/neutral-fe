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