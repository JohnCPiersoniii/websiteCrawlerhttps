const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages) {
    
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    const normalizedCurrentURL = normalizeUrl(currentURL)
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }

    pages[normalizedCurrentURL] = 1

    console.log(`Crawling ${currentURL}`)


    try{
        const resp = await fetch(currentURL)
        if(resp.status > 399){
            console.log(`error in fetch: ${resp.status} on URL: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html") ){
            console.log(`non html response, content type: ${contentType}, on URL: ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHtml(htmlBody, baseURL)
        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }        
    } catch (err) {
        console.log(`error in fetch: ${err.message}, on URL: ${currentURL}`)
    }
    return pages

}

function getURLsFromHtml(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0,1) === '/') {
            // relative URL
            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`error with relative url: ${err.message}`)
            }
        } else {
            // absolute URL
            try{
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            }catch(err){
                console.log(`error with absolute url: ${err.message}`)
            }
        }
        
    }
    return urls
}

function normalizeUrl(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.endsWith('/')) {
        return `${urlObj.hostname.toLowerCase()}${urlObj.pathname.slice(0, -1)}`
    }
    return hostPath.toLowerCase()
}

module.exports = {
    normalizeUrl,
    getURLsFromHtml,
    crawlPage,
}