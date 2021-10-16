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
        //     asset_id: 'a08bdb0de715ec5955271054c4d91985',
        //     public_id: 'f3434ee0-2e87-11ec-9687-df6e47b0a481',
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
        //     etag: '781da2ac28107c1b508aef3f5c7188f7',
        //     placeholder: false,
        //     url: 'http://res.cloudinary.com/ekky01/image/upload/v1634392197/f3434ee0-2e87-11ec-9687-df6e47b0a481.png',
        //     secure_url: 'https://res.cloudinary.com/ekky01/image/upload/v1634392197/f3434ee0-2e87-11ec-9687-df6e47b0a481.png',
        //     original_filename: 'file',
        //     api_key: '146441793128381'
        //   }
      }
    }).end(req.files.images[0].buffer);
  } catch (err) {
    console.log(err);
  }

  return res.send(data);
};
