import sharp from "sharp";
import { unlink } from 'fs/promises'

class UploadOneFile {
    async execute(file: Express.Multer.File, path: string) {
        if (file) {
            const files = file as Express.Multer.File
            await sharp(files.path).resize(500).toFormat('jpeg').toFile(`${path}${files.filename}.jpg`);
            await unlink(files.path)
            return files.filename + ".jpg";

        } else {
            throw new Error("Upload file error")
        }
    }
}

export { UploadOneFile }