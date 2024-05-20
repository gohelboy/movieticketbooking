
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export const uploadImage = async (file, folderName) => {

    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
        await cloudinary.uploader.upload_stream({
            resourse_type: "auto",
            folder: folderName,
        }, async (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        }).end(bytes)
    });
}