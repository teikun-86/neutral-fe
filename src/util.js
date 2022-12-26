export const mergeProps = (props, ...items) => {
    return Object.assign({}, props, ...items)
}

export const searchString = (needle, haystack) => {
    return haystack
        .toLowerCase()
        .replace(/\s+/g, '')
        .includes(needle.toLowerCase().replace(/\s+/g, ''))
}