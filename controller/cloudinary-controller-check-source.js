/* eslint-disable consistent-return */
const axios = require('axios');
const { startCloudinary } = require('../config/cloudinary-config');

exports.checkingSourceByPublicId = async (req, res) => {
  const { public_id: publicId } = req.params;
  const cloudinary = await startCloudinary();

  const data = await new Promise((resolve, reject) => {
    cloudinary.api.resource(publicId, (err, result) => {
      if (err) return reject(err);
      if (result) return resolve(result);
    });
  });

  return res.send(data);
};

exports.checkingInformationByPublicId = async (req, res) => {
  const cloudinary = await startCloudinary();
  const { public_id: publicId } = req.params;

  let data = '';

  try {
    const url = cloudinary.url(publicId, { transformation: [
      { gravity: 'face', width: 500, crop: 'thumb' },
      { flags: 'getinfo' },
    ] });

    const opt = {
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    data = await axios(opt)
      .then((ok) => {
        if (ok.data) {
          const detail = ok.data;
          detail.url = url;
          return detail;
        } return false;
      })
      .catch((error) => error);
  } catch (err) {
    console.log(err);
  }

  return res.send(data);
};
