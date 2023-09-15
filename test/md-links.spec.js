const mdLinks = require('../index');

describe('mdLinks', () => {
  it('Should return an array of Objects', () => {
      const path = 'example.md';
      const options = {
        validation: true
      };
      mdLinks.mdLinks(path, options).then((response) => {
          expect(response).toEqual( [
            {
              href: 'https://www.instagram.com/',
              text: 'Instagram',
              file: 'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md',
              status: 200,
              ok: 'ok'
            },
            {
              href: 'https://www.facebook.com/',
              text: 'Facebook',
              file: 'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md',
              status: 200,
              ok: 'ok'
            }
          ])
      })
  });
  it('Should return an array of Objects', () => {
      const path = 'example.md';
      const options = {
        validation: false
      };
      mdLinks.mdLinks(path, options).then((response) => {
          expect(response).toEqual( [
            {
              href: 'https://www.instagram.com/',
              text: 'Instagram',
              file: 'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md',
            },
            {
              href: 'https://www.facebook.com/',
              text: 'Facebook',
              file: 'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md',
            }
          ])
      })
  });
});