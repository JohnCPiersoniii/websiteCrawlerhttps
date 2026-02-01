const  {normalizeUrl, getURLsFromHtml}  = require('./crawl');
const {test, expect} = require('@jest/globals');

test('normalizeUrl strip protocal', () => {
    const input = 'htttps://WakaWaka.fozzy.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'wakawaka.fozzy.dev/path'
    expect(actual).toEqual(expected)
})  

test('normalizeUrl strip trailing slash', () => {
    const input = 'htttps://WakaWaka.fozzy.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'wakawaka.fozzy.dev/path'
    expect(actual).toEqual(expected)
})  

test('normalizeUrl capitilize', () => {
    const input = 'htttps://WakaWaka.FOZZY.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'wakawaka.fozzy.dev/path'
    expect(actual).toEqual(expected)
})  

test('normalizeUrl strip https http', () => {
    const input = 'htttp://wakawaka.fozzy.dev/path'
    const actual = normalizeUrl(input)
    const expected = 'wakawaka.fozzy.dev/path'
    expect(actual).toEqual(expected)
})  

test('getURLsFromHtml absolute', () => {
    const inputHTMLbody = `
<html>
    <body>
        <a href="https://digitaltoolsbyjohnpierson.wordpress.com/path/">link01</a>
    </body>
</html>
`
    const inputBaseURL = 'https://digitaltoolsbyjohnpierson.wordpress.com/path/'
    const actual = getURLsFromHtml(inputHTMLbody, inputBaseURL)
    const expected = ['https://digitaltoolsbyjohnpierson.wordpress.com/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHtml relative', () => {
    const inputHTMLbody = `
<html>
    <body>
        <a href="/path/">link01</a>
    </body>
</html>
`
    const inputBaseURL = 'https://digitaltoolsbyjohnpierson.wordpress.com'
    const actual = getURLsFromHtml(inputHTMLbody, inputBaseURL)
    const expected = ['https://digitaltoolsbyjohnpierson.wordpress.com/path/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHtml pulls out multiple links', () => {
    const inputHTMLbody = `
<html>
    <body>
        <a href="https://digitaltoolsbyjohnpierson.wordpress.com/path/">link01</a>
        <a href="/path2/">link02</a>
    </body>
</html>
`
    const inputBaseURL = 'https://digitaltoolsbyjohnpierson.wordpress.com'
    const actual = getURLsFromHtml(inputHTMLbody, inputBaseURL)
    const expected = ['https://digitaltoolsbyjohnpierson.wordpress.com/path/', 'https://digitaltoolsbyjohnpierson.wordpress.com/path2/']
    expect(actual).toEqual(expected)
})

test('getURLsFromHtml invalid URL', () => {
    const inputHTMLbody = `
<html>
    <body>
        <a href="invalid">Invalid URL</a>
    </body>
</html>
`
    const inputBaseURL = 'https://digitaltoolsbyjohnpierson.wordpress.com'
    const actual = getURLsFromHtml(inputHTMLbody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})