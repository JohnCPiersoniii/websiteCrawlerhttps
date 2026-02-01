const  { sortPages }  = require('./report');
const {test, expect} = require('@jest/globals');

test('sortPages', () => {
    const input = {
        'https://example.com/page1': 5,
        'https://example.com/page2': 10,
        'https://example.com/page3': 3,
        'https://example.com/page4': 6,
    }
    const actual = sortPages(input)
    const expected = [
        ['https://example.com/page2', 10 ],
        ['https://example.com/page4', 6 ],
        ['https://example.com/page1', 5 ],
        ['https://example.com/page3', 3 ]
    ]
    expect(actual).toEqual(expected)
})  