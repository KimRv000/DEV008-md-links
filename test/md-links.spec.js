const mdLinks = require('../index');

describe('mdLinks', () => {
    it.skip('Should return an array of Objects', () => {
        const path = 'example.md';
        expect(mdLinks.mdLinks(path)).toEqual({
            file: 'example.md',
            href: 'https://www.instagram.com/',
            text: 'Instagram '
          },
          {
            file: 'example.md',
            href: 'https://www.facebook.com/',
            text: 'Facebook'
          }
          );
    });
    });