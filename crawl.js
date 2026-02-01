function normalizeUrl(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.endsWith('/')) {
        return `${urlObj.hostname.toLowerCase()}${urlObj.pathname.slice(0, -1)}`
    }
    return hostPath.toLowerCase()
}

module.exports = {
    normalizeUrl
}