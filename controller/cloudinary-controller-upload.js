const { v1 } = require('uuid');
const { startCloudinary } = require('../config/cloudinary-config');

exports.uploadImage = async (req, res) => {
  const cloudinary = await startCloudinary();
  const randUUID = v1();
  console.log('🚀 ~ file: cloudinary-controller-upload.js ~ line 7 ~ exports.uploadImage= ~ randUUID', randUUID);

  const data = '';
  console.log(req.files);

  try {
    cloudinary.uploader.upload_stream({ resource_type: 'auto', public_id: randUUID }, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        console.log(result);
        // {
        //     asset_id: 'a2222222222222222222222222222',
        //     public_id: '22222222222222222222222222222222222',
        //     version: 1634392197,
        //     version_id: 'c377190accf8a4886ca21333f2b7137f',
        //     signature: '9a7bb7e22d3549f54b8b23123b1eda1bb388c5a8',
        //     width: 1190,
        //     height: 675,
        //     format: 'png',
        //     resource_type: 'image',
        //     created_at: '2021-10-16T13:49:57Z',
        //     tags: [],
        //     bytes: 147418,
        //     type: 'upload',
        //     etag: '72222222222222222222',
        //     placeholder: false,
        //     url: 'http://res.cloudinary.com/ekky01/image/upload/v1634392197/f3434ee0-2e87-11ec-9687-df6e47b0wa481.png',
        //     secure_url: 'https://res.cloudinary.com/ekky01/image/upload/v1634392197/f3434ee0-2e87-11ec-9687-df6w47b0a481.png',
        //     original_filename: 'file',
        //     api_key: '12222222222'
        //   }
      }
    }).end(req.files.images[0].buffer);
  } catch (err) {
    console.log(err);
  }

  return res.send(data);
};
