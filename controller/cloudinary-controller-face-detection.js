/* eslint-disable consistent-return */
const axios = require('axios');
const { v1 } = require('uuid');
const { startCloudinary } = require('../config/cloudinary-config');

exports.uploadImageFaceDetection = async (req, res) => {
  const cloudinary = await startCloudinary();
  const randUUID = v1();

  let data = '';
  console.log(req.files);

  try {
    data = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'auto',
          public_id: randUUID,
          detection: 'adv_face',
        }, (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result) {
            return resolve(result);
          }
        },
      ).end(req.files.images[0].buffer);
    });
  } catch (err) {
    console.log(err);
  }
  return res.send(data);
};

exports.checkUploadedFace = async (req, res) => {
  const cloudinary = await startCloudinary();
  const { public_id: publicId } = req.body;

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

// sample upload face-detection
// eslint-disable-next-line no-unused-vars
const samplePhoto = {
  asset_id: 'c7ec5f684697e19e38db02cd6045002d',
  public_id: 'c5aab010-2f11-11ec-947b-db2ec7555292',
  version: 1634451393,
  version_id: 'e60ca3681744e00979e5d368fdd22a43',
  signature: '6b8dc97e60d4743e95cfce7bbd64057c4b0e5e4d',
  width: 1920,
  height: 1080,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2021-10-17T06:16:33Z',
  tags: [],
  bytes: 332550,
  type: 'upload',
  etag: 'a5b20f17f28ef6357cde00d6eb47548b',
  placeholder: false,
  url: 'http://f/image/upload/v1634451393/c5aab010-2f11-11ec-947b-db2ec7555292.jpg',
  secure_url: 'https://f/image/upload/v1634451393/c5aab010-2f11-11ec-947b-db2ec7555292.jpg',
  info: {
    detection: {
      adv_face: {
        status: 'complete',
        data: [
          {
            bounding_box: {
              top: 494.4,
              left: 832.8,
              width: 415.2,
              height: 415.2,
            },
            attributes: {
              smile: 0,
              head_pose: {
                pitch: -2.3,
                roll: 4.6,
                yaw: 2.2,
              },
              gender: 'male',
              age: 32,
              facial_hair: {
                moustache: 0.6,
                beard: 0.6,
                sideburns: 0.4,
              },
              glasses: 'ReadingGlasses',
              emotion: {
                anger: 0,
                contempt: 0,
                disgust: 0,
                fear: 0,
                happiness: 0,
                neutral: 0.998,
                sadness: 0.002,
                surprise: 0,
              },
              blur: {
                blurLevel: 'low',
                value: 0.15,
              },
              exposure: {
                exposureLevel: 'goodExposure',
                value: 0.47,
              },
              noise: {
                noiseLevel: 'low',
                value: 0,
              },
              makeup: {
                eyeMakeup: false,
                lipMakeup: false,
              },
              accessories: [
                {
                  type: 'glasses',
                  confidence: 1,
                },
              ],
              occlusion: {
                foreheadOccluded: false,
                eyeOccluded: false,
                mouthOccluded: false,
              },
              hair: {
                bald: 0.23,
                invisible: false,
                hairColor: [
                  {
                    color: 'black',
                    confidence: 1,
                  },
                  {
                    color: 'brown',
                    confidence: 0.72,
                  },
                  {
                    color: 'gray',
                    confidence: 0.52,
                  },
                  {
                    color: 'other',
                    confidence: 0.51,
                  },
                  {
                    color: 'blond',
                    confidence: 0.03,
                  },
                  {
                    color: 'red',
                    confidence: 0.02,
                  },
                  {
                    color: 'white',
                    confidence: 0,
                  },
                ],
              },
            },
            facial_landmarks: {
              mouth: {
                left: {
                  x: 949.1999999999999,
                  y: 798.4799999999999,
                },
                right: {
                  x: 1121.04,
                  y: 805.44,
                },
                under_lip: {
                  bottom: {
                    x: 1033.92,
                    y: 837.84,
                  },
                  top: {
                    x: 1036.08,
                    y: 812.1599999999999,
                  },
                },
                upper_lip: {
                  bottom: {
                    x: 1037.76,
                    y: 805.68,
                  },
                  top: {
                    x: 1038.72,
                    y: 788.1599999999999,
                  },
                },
              },
              eyebrow: {
                left_outer: {
                  x: 871.68,
                  y: 575.28,
                },
                left_inner: {
                  x: 999.84,
                  y: 562.56,
                },
                right_inner: {
                  x: 1084.08,
                  y: 569.52,
                },
                right_outer: {
                  x: 1205.76,
                  y: 592.8,
                },
              },
              eye: {
                left_outer: {
                  x: 926.64,
                  y: 606.72,
                },
                left_top: {
                  x: 957.3599999999999,
                  y: 597.12,
                },
                left_bottom: {
                  x: 951.84,
                  y: 616.56,
                },
                left_inner: {
                  x: 980.8799999999999,
                  y: 610.32,
                },
                right_inner: {
                  x: 1103.28,
                  y: 612.24,
                },
                right_top: {
                  x: 1129.92,
                  y: 601.92,
                },
                right_bottom: {
                  x: 1128.24,
                  y: 622.8,
                },
                right_outer: {
                  x: 1152.72,
                  y: 617.7599999999999,
                },
                left_pupil: {
                  x: 955.1999999999999,
                  y: 603.12,
                },
                right_pupil: {
                  x: 1126.32,
                  y: 608.64,
                },
              },
              nose: {
                tip: {
                  x: 1054.08,
                  y: 717.12,
                },
                root_left: {
                  x: 1018.0799999999999,
                  y: 613.4399999999999,
                },
                root_right: {
                  x: 1072.08,
                  y: 615.12,
                },
                left_alar_top: {
                  x: 1001.04,
                  y: 688.56,
                },
                right_alar_top: {
                  x: 1089.6,
                  y: 689.7599999999999,
                },
                left_alar_out_tip: {
                  x: 978.24,
                  y: 720.9599999999999,
                },
                right_alar_out_tip: {
                  x: 1104.48,
                  y: 722.16,
                },
              },
            },
          },
        ],
      },
    },
  },
  original_filename: 'file',
  api_key: '1ddddd',
};
// eslint-disable-next-line no-unused-vars
const samplePhotoTest = {
  asset_id: 'bf90e3dbd922b5683d48afd443c1eece',
  public_id: 'e9059a80-2f15-11ec-8dce-7bf7f2e85dc1',
  version: 1634453170,
  version_id: 'c43c4ad1f6da61f082e710536f0ef763',
  signature: 'd1615f54bdd08758aa0a4005a66fd71b7f0a76b5',
  width: 1280,
  height: 720,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2021-10-17T06:46:10Z',
  tags: [],
  bytes: 109048,
  type: 'upload',
  etag: '8e1b6d11f207a1055a0d80350d735c1c',
  placeholder: false,
  url: 'http://f/image/upload/v1634453170/e9059a80-2f15-11ec-8dce-7bf7f2e85dc1.jpg',
  secure_url: 'https://f/image/upload/v1634453170/e9059a80-2f15-11ec-8dce-7bf7f2e85dc1.jpg',
  info: {
    detection: {
      adv_face: {
        status: 'complete',
        data: [
          {
            bounding_box: {
              top: 270.4,
              left: 836.8,
              width: 148.8,
              height: 148.8,
            },
            attributes: {
              smile: 0,
              head_pose: {
                pitch: 2.1,
                roll: -2.8,
                yaw: -3.3,
              },
              gender: 'male',
              age: 32,
              facial_hair: {
                moustache: 0.4,
                beard: 0.4,
                sideburns: 0.1,
              },
              glasses: 'NoGlasses',
              emotion: {
                anger: 0,
                contempt: 0,
                disgust: 0,
                fear: 0,
                happiness: 0,
                neutral: 1,
                sadness: 0,
                surprise: 0,
              },
              blur: {
                blurLevel: 'medium',
                value: 0.62,
              },
              exposure: {
                exposureLevel: 'goodExposure',
                value: 0.62,
              },
              noise: {
                noiseLevel: 'medium',
                value: 0.34,
              },
              makeup: {
                eyeMakeup: true,
                lipMakeup: false,
              },
              accessories: [],
              occlusion: {
                foreheadOccluded: false,
                eyeOccluded: false,
                mouthOccluded: false,
              },
              hair: {
                bald: 0.2,
                invisible: false,
                hairColor: [
                  {
                    color: 'black',
                    confidence: 1,
                  },
                  {
                    color: 'brown',
                    confidence: 0.83,
                  },
                  {
                    color: 'gray',
                    confidence: 0.49,
                  },
                  {
                    color: 'other',
                    confidence: 0.3,
                  },
                  {
                    color: 'blond',
                    confidence: 0.06,
                  },
                  {
                    color: 'red',
                    confidence: 0.01,
                  },
                  {
                    color: 'white',
                    confidence: 0,
                  },
                ],
              },
            },
            facial_landmarks: {
              mouth: {
                left: {
                  x: 888.8,
                  y: 384.15999999999997,
                },
                right: {
                  x: 940.64,
                  y: 381.28000000000003,
                },
                under_lip: {
                  bottom: {
                    x: 913.6,
                    y: 397.76,
                  },
                  top: {
                    x: 912.96,
                    y: 386.88,
                  },
                },
                upper_lip: {
                  bottom: {
                    x: 911.68,
                    y: 381.44,
                  },
                  top: {
                    x: 910.5600000000001,
                    y: 372.32,
                  },
                },
              },
              eyebrow: {
                left_outer: {
                  x: 852.32,
                  y: 300.64,
                },
                left_inner: {
                  x: 893.28,
                  y: 293.6,
                },
                right_inner: {
                  x: 919.04,
                  y: 292.15999999999997,
                },
                right_outer: {
                  x: 962.4,
                  y: 292.32,
                },
              },
              eye: {
                left_outer: {
                  x: 867.68,
                  y: 313.28000000000003,
                },
                left_top: {
                  x: 878.5600000000001,
                  y: 306.71999999999997,
                },
                left_bottom: {
                  x: 878.24,
                  y: 315.52,
                },
                left_inner: {
                  x: 888.96,
                  y: 312.32,
                },
                right_inner: {
                  x: 927.68,
                  y: 310.56,
                },
                right_top: {
                  x: 938.24,
                  y: 304.15999999999997,
                },
                right_bottom: {
                  x: 938.5600000000001,
                  y: 313.12,
                },
                right_outer: {
                  x: 949.6,
                  y: 309.12,
                },
                left_pupil: {
                  x: 879.36,
                  y: 309.6,
                },
                right_pupil: {
                  x: 938.72,
                  y: 307.2,
                },
              },
              nose: {
                tip: {
                  x: 908.4799999999999,
                  y: 344.96,
                },
                root_left: {
                  x: 899.2,
                  y: 313.12,
                },
                root_right: {
                  x: 917.76,
                  y: 312.8,
                },
                left_alar_top: {
                  x: 894.8799999999999,
                  y: 336.32,
                },
                right_alar_top: {
                  x: 922.4,
                  y: 336.32,
                },
                left_alar_out_tip: {
                  x: 889.6,
                  y: 351.04,
                },
                right_alar_out_tip: {
                  x: 929.4399999999999,
                  y: 349.76,
                },
              },
            },
          },
        ],
      },
    },
  },
  original_filename: 'file',
  api_key: 'ddddd',
};
// eslint-disable-next-line no-unused-vars
const sampleTzuyu = {
  asset_id: 'ce1d4f07223405913e0fa0ed1bf90ee6',
  public_id: 'ef708f00-2f16-11ec-9b78-39ad813d580d',
  version: 1634453611,
  version_id: 'a89e034151f165b22b1ebcfb6abf78b3',
  signature: 'e030e4ef5943cf7549838cdb5b40fbce78cb0fd0',
  width: 1280,
  height: 800,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2021-10-17T06:53:31Z',
  tags: [],
  bytes: 148145,
  type: 'upload',
  etag: '1dab85fff1b0ca053e2a61cacf08fc06',
  placeholder: false,
  url: 'http://f/image/upload/v1634453611/ef708f00-2f16-11ec-9b78-39ad813d580d.jpg',
  secure_url: 'https://f/image/upload/v1634453611/ef708f00-2f16-11ec-9b78-39ad813d580d.jpg',
  info: {
    detection: {
      adv_face: {
        status: 'complete',
        data: [
          {
            bounding_box: {
              top: 233.6,
              left: 504,
              width: 288,
              height: 288,
            },
            attributes: {
              smile: 1,
              head_pose: {
                pitch: 2.8,
                roll: 12.5,
                yaw: -17.9,
              },
              gender: 'female',
              age: 22,
              facial_hair: {
                moustache: 0,
                beard: 0,
                sideburns: 0,
              },
              glasses: 'NoGlasses',
              emotion: {
                anger: 0,
                contempt: 0,
                disgust: 0,
                fear: 0,
                happiness: 1,
                neutral: 0,
                sadness: 0,
                surprise: 0,
              },
              blur: {
                blurLevel: 'low',
                value: 0.17,
              },
              exposure: {
                exposureLevel: 'goodExposure',
                value: 0.6,
              },
              noise: {
                noiseLevel: 'low',
                value: 0.11,
              },
              makeup: {
                eyeMakeup: true,
                lipMakeup: true,
              },
              accessories: [],
              occlusion: {
                foreheadOccluded: false,
                eyeOccluded: false,
                mouthOccluded: false,
              },
              hair: {
                bald: 0.06,
                invisible: false,
                hairColor: [
                  {
                    color: 'brown',
                    confidence: 0.99,
                  },
                  {
                    color: 'black',
                    confidence: 0.95,
                  },
                  {
                    color: 'gray',
                    confidence: 0.2,
                  },
                  {
                    color: 'blond',
                    confidence: 0.14,
                  },
                  {
                    color: 'other',
                    confidence: 0.12,
                  },
                  {
                    color: 'red',
                    confidence: 0.11,
                  },
                  {
                    color: 'white',
                    confidence: 0,
                  },
                ],
              },
            },
            facial_landmarks: {
              mouth: {
                left: {
                  x: 577.6,
                  y: 425.43999999999994,
                },
                right: {
                  x: 702.88,
                  y: 453.28000000000003,
                },
                under_lip: {
                  bottom: {
                    x: 623.6800000000001,
                    y: 471.52,
                  },
                  top: {
                    x: 627.36,
                    y: 456,
                  },
                },
                upper_lip: {
                  bottom: {
                    x: 629.4399999999999,
                    y: 439.68,
                  },
                  top: {
                    x: 631.04,
                    y: 432.32,
                  },
                },
              },
              eyebrow: {
                left_outer: {
                  x: 560.8,
                  y: 261.6,
                },
                left_inner: {
                  x: 631.6800000000001,
                  y: 276.8,
                },
                right_inner: {
                  x: 692.8,
                  y: 290.88,
                },
                right_outer: {
                  x: 792.1600000000001,
                  y: 312.96,
                },
              },
              eye: {
                left_outer: {
                  x: 573.4399999999999,
                  y: 297.28000000000003,
                },
                left_top: {
                  x: 599.36,
                  y: 293.28000000000003,
                },
                left_bottom: {
                  x: 593.4399999999999,
                  y: 310.56,
                },
                left_inner: {
                  x: 617.28,
                  y: 309.91999999999996,
                },
                right_inner: {
                  x: 700.64,
                  y: 327.04,
                },
                right_top: {
                  x: 727.8399999999999,
                  y: 319.04,
                },
                right_bottom: {
                  x: 725.4399999999999,
                  y: 337.6,
                },
                right_outer: {
                  x: 752.48,
                  y: 333.6,
                },
                left_pupil: {
                  x: 598.08,
                  y: 301.28000000000003,
                },
                right_pupil: {
                  x: 726.88,
                  y: 328.15999999999997,
                },
              },
              nose: {
                tip: {
                  x: 630.5600000000001,
                  y: 390.08000000000004,
                },
                root_left: {
                  x: 636.48,
                  y: 317.28000000000003,
                },
                root_right: {
                  x: 676.8,
                  y: 325.91999999999996,
                },
                left_alar_top: {
                  x: 618.08,
                  y: 362.08000000000004,
                },
                right_alar_top: {
                  x: 668.64,
                  y: 375.36,
                },
                left_alar_out_tip: {
                  x: 599.52,
                  y: 382.88,
                },
                right_alar_out_tip: {
                  x: 678.4,
                  y: 403.36,
                },
              },
            },
          },
        ],
      },
    },
  },
  original_filename: 'file',
  api_key: '1111',
};
