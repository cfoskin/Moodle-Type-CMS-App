'use strict';
const AWS = require('aws-sdk');
const path = require('path');
AWS.config.loadFromPath(path.join(__dirname, '../../config/awsConfig.json'));
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const fs = require('fs');

exports.uploadToS3 = (req, res) => {
    let bucket;
    let file = req.files.file;

    s3.listBuckets((err, data) => {
        if (err) {
            return console.log("Error", err);
        } else {
            bucket = data.Buckets[0];
            let uploadParams = { Bucket: bucket.Name, Key: '', Body: '', ACL: 'public-read-write' };
            let fileStream = fs.createReadStream(file.path);
            fileStream.on('error', (err) => {
                return res.status(500).json({
                    message: 'File Error',
                    err: err
                });
            });
            uploadParams.Body = fileStream;
            uploadParams.Key = path.basename(file.originalFilename);
            s3.upload(uploadParams, (err, data) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Upload Error',
                        err: err
                    });
                }
                if (data) {
                    return res.status(201).json({
                        message: 'Upload Success',
                        fileUrl: data.Location
                    });
                }
            });
        }
    });
};
