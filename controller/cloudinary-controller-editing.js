// const { v1 } = require('uuid');
const { startCloudinary } = require('../config/cloudinary-config');

async function performTransformations(uploads) {
  const cloudinary = await startCloudinary();

  const eager_options = {
    width: 200, height: 150, crop: 'scale', format: 'jpg',
  };

  // public_id
  const { pizza2, lake, couple, couple2 } = uploads;

  console.log();
  console.log();
  console.log();
  console.log('>> >> >> >> >> >> >> >> >> >>  Transformations << << << << << << << << << <<');
  console.log();
  console.log('> Fit into 200x150');
  console.log(`> ${cloudinary.url(pizza2, {
    width: 200, height: 150, crop: 'fit', format: 'jpg',
  })}`);

  console.log();
  console.log('> Eager transformation of scaling to 200x150');
  console.log(`> ${cloudinary.url(lake, eager_options)}`);

  console.log();
  console.log('> Face detection based 200x150 thumbnail');
  console.log(`> ${cloudinary.url(couple, {
    width: 200, height: 150, crop: 'thumb', gravity: 'faces', format: 'jpg',
  })}`);

  console.log();
  console.log('> Fill 200x150, round corners, apply the sepia effect');
  console.log(`> ${cloudinary.url(couple2, {
    width: 200,
    height: 150,
    crop: 'thumb',
    radius: 50,
    gravity: 'face',
    effect: 'sepia',
    format: 'png',
  })}`);

  console.log();
  console.log('> Custom');
  console.log(`> ${cloudinary.image(couple2, { width: 200, height: 200, radius: 'max', crop: 'fill' })}`);

  console.log();
  console.log("> That's it. You can now open the URLs above in a browser");
  console.log('> and check out the generated images.');
}

exports.editImage = async (req, res) => {
  const { pizza2, lake, couple, couple2 } = req.body;
  const uploads = { pizza2, lake, couple, couple2 };

  const data = 'editing image';

  try {
    await performTransformations(uploads);
  } catch (err) {
    console.log(err);
  }

  return res.send(data);
};
