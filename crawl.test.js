const  {normalizeUrl}  = require('./crawl');
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
    const input = 'htttps://WakaWaka.FOZZY.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'wakawaka.fozzy.dev/path'
    expect(actual).toEqual(expected)
})  

test('normalizeUrl strip https http', () => {
    const input = 'htttp://wakawaka.fozzy.dev/path/'
    const actual = normalizeUrl(input)
    const expected = 'wakawaka.fozzy.dev/path'
    expect(actual).toEqual(expected)
})  

