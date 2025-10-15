import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { v4 as uuidv4 } from 'uuid'

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'receipts'
const S3_INTERNAL_ENDPOINT = process.env.S3_INTERNAL_ENDPOINT
const S3_PUBLIC_ENDPOINT = process.env.S3_PUBLIC_ENDPOINT

if (!S3_INTERNAL_ENDPOINT || !process.env.S3_ACCESS_KEY || !process.env.S3_SECRET_KEY) {
    throw new Error("MINIO/S3 environment variables are not set. File uploads will fail.")
}

const s3Client = new S3Client({
    region: 'us-east-1',
    endpoint: S3_INTERNAL_ENDPOINT,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY,
    }
})

const uploadReceipt = async (file) => {
    if (!file || !file.buffer) {
        throw new Error("Invalid file or file buffer provided.")
    }

    const fileExtension = file.originalname.split('.').pop()
    const uniqueFileName = `${uuidv4()}.${fileExtension}`

    const parallelUploads3 = new Upload({
        client: s3Client,
        params: {
            Bucket: BUCKET_NAME,
            Key: uniqueFileName,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'public-read'
        }
    })

    try {
        await parallelUploads3.done()

        // Return public url
        return `${S3_PUBLIC_ENDPOINT}/${BUCKET_NAME}/${uniqueFileName}`
    } catch (error) {
        console.error("MinIO Upload Error:", error)
        throw new Error("Failed to upload file to storage service.")
    }
}

const deleteReceipt = async (fileKey) => {
    if (!fileKey) {
        throw new Error("File key is required for deletion.")
    }

    const deleteParams = {
        Bucket: BUCKET_NAME,
        Key: fileKey
    }

    try {
        const command = new DeleteObjectCommand(deleteParams)
        await s3Client.send(command)
        return true
    } catch (error) {
        console.error(`MinIO Delete Error for ${fileKey}:`, error)
        throw new Error(`Failed to delete file from storage service: ${fileKey}`)
    }
}

export {
    uploadReceipt,
    deleteReceipt
}