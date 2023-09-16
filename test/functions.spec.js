const functions = require('../functions')

describe('validateAbsolutePath', () => {
    it('Should validate an absolute path', () => {
        const path = 'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md';
        expect(functions.validateAbsolutePath(path)).toEqual(true);
    });
    it('Should validate an absolute path', () => {
        const path = 'testing_docs/DataLovers.md';
        expect(functions.validateAbsolutePath(path)).toEqual(false);
    });
});

describe('convertToAbsolutePath', () => {
    it('Should return an absolute path from a relative path', () => {
        const relativePath = 'example.md';
        expect(functions.convertToAbsolutePath(relativePath)).toEqual(
            'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md'
        );
    });
});

describe('identifyFileExtension', () => {
    it('Should return the extension of a file', () => {
        const path = 'testing_docs/DataLovers.md';
        expect(functions.identifyFileExtension(path)).toEqual('.md');
    });
});

describe('getLinks', () => {
    it('Should return the links from a file', () => {
        const path = 'example.md';
        expect(functions.getLinks(path)).toEqual([
            {
                file: 'example.md',
                href: 'https://www.instagram.com/',
                text: 'Instagram'
            },
            {
                file: 'example.md',
                href: 'https://www.facebook.com/',
                text: 'Facebook'
            }
        ]);
    });
});

describe('validateLinks', () => {
    it('Should validate the links status', () => {
        const path = 'example.md';
        functions.validateLinks(path).then((response) => {
            expect(response).toEqual([{
                href: 'https://www.instagram.com/',
                text: 'Instagram',
                file: 'example.md',
                status: 200,
                ok: 'ok'
            }, 
            {
                href: 'https://www.facebook.com/',
                text: 'Facebook',
                file: 'example.md',
                status: 200,
                ok: 'ok'
            }])
        })
    });
});