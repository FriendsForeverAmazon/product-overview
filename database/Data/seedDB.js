const generateProducts = require('./generateProducts');
const generatePhotos = require('./generatePhotos');
const generatePhotosURL = require('./generatePhotosURL');

generateProducts(() => {
  generatePhotos(() => {
    generatePhotosURL(() => {
      process.exit(1);
    });
  });
});
