const mdLinks = require('../index');

describe('mdLinks', () => {
  it.skio('Should return an array of Objects', () => {
    const path = 'example.md';
    expect(mdLinks.mdLinks(path)).toEqual([
      [
        {
          file: 'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md',
          href: 'https://www.instagram.com/',
          text: 'Instagram '
        },
        {
          file: 'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md',
          href: 'https://www.facebook.com/',
          text: 'Facebook'
        }
      ]
    ]
    );
  });
});