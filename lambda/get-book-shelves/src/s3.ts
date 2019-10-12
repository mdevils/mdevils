import * as aws from 'aws-sdk';

const awsS3 = new aws.S3();

export const s3 = new (class S3 {
  upload(filename: string, bucketName: string, body: string) {
    return new Promise((resolve, reject) => {
      awsS3.putObject({
        Bucket: bucketName,
        Key: filename,
        Body: body
      }, (e) => {
        if (e) {
          reject(e);
          return;
        }
        resolve();
      });
    });
  }

  download(filename: string, bucketName: string): Promise<{lastModified: Date, body: string}> {
    return new Promise((resolve, reject) => {
      awsS3.getObject({
        Key: filename,
        Bucket: bucketName
      }, (e, data) => {
        if (e) {
          reject(e);
          return;
        }
        return resolve({lastModified: data.LastModified!, body: (data.Body as Buffer).toString('utf8')});
      });
    });
  }
})();
