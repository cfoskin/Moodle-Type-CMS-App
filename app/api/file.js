'use strict';
const File = require('../models/file');
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
                        fileUrl: data.Location,
                        fileName: data.key
                    });
                }
            });
        }
    });
};

exports.createFile = (req, res) => {
    let file = { name: req.body.fileName, url: req.body.fileUrl };
    const aFile = new File(file);
    aFile.save()
        .then(newFile => {
            return res.status(201).json({
                message: 'new file saved in db',
                file: newFile
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'error storing file',
                error: err
            });
        })
}

exports.getFiles = (req, res) => {
    File.find({}).exec()
        .then(files => {
            return res.status(200).json(files);
        })
};

exports.deleteFile = (req, res) => {
    File.remove({ _id: req.params.id })
        .then(file => {
            return res.status(204).json(file);
        })
        .catch(err => {
            return res.status(404).json({
                message: 'file not found',
                error: err
            });
        });
};

exports.updateFile = (req, res) => {
    File.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { 'new': true })
        .then(file => {
            if (file != null) {
                return res.status(200).json(file);
            }
        })
        .catch(err => {
            return res.status(400).json({
                message: 'error updating file',
                error: err
            });
        })
};

exports.getFile = (req, res) => {
    File.findOne({ _id: req.params.id })
        .then(file => {
            if (file != null) {
                return res.status(200).json(file)
            }
        })
        .catch(err => {
            return res.status(400).json({
                message: 'file not found',
                error: err
            });
        })
};

