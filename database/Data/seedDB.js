const generateProducts = require('./genertareProducts');
const generatePhotos = require('./genertarePhotos');

generateProducts(() => {
  generatePhotos(() => {
    process.exit(1);
  });
});
