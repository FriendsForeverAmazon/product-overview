const generateProducts = require('./genertareProducts');
const generatePhotos = require('./genertarePhotos');

generateProducts(() => {
  process.exit(1);
});

// generatePhotos(() => {
// });
