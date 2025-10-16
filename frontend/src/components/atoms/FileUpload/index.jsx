import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import Trashcan from '@assets/Trashcan.svg'
import UploadFile from '@assets/UploadFile.svg'
import styles from './FileUpload.module.css'

/*
    In Parent Component:
    const [filesArray, setFilesArray] = useState([])
*/

const FileUpload = ({
    hint,
    filesArray,
    setFilesArray,
    existingImages,
    setExistingImages,
    style
}) => {
    const MAX_FILES_LIMIT = 5

    const onDrop = useCallback(acceptedFiles => {
        const totalExistingFiles = filesArray.length

        // 1. Calculate how many *new* files can actually be added.
        const filesToAddCount = Math.min(
            acceptedFiles.length, // Don't add more than were accepted
            MAX_FILES_LIMIT - totalExistingFiles // Don't exceed the total limit
        )

        // 2. Slice the acceptedFiles to only include the allowed number.
        const allowedFiles = acceptedFiles.slice(0, filesToAddCount)

        // 3. Map only the allowed files.
        const newFiles = allowedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        )

        // 4. Update state with only the allowed files.
        setFilesArray(prevFiles => [...prevFiles, ...newFiles])

        // Optional: Provide feedback if files were rejected here too (e.g., using a separate state for errors)
        if (acceptedFiles.length > allowedFiles.length) {
            console.warn('Some files were rejected because the limit was hit.')
        }

    }, [setFilesArray, filesArray])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.png', '.jpg'] }
    })

    const removeFile = useCallback((fileToRemove) => {
        setFilesArray(prevFiles =>
            prevFiles.filter(file => file !== fileToRemove)
        )

        URL.revokeObjectURL(fileToRemove.preview)
    }, [setFilesArray])

    const removeExistingFile = useCallback((imageToRemove) => {
        const newImages = existingImages.filter((existingImage) =>
            existingImage.src !== imageToRemove.src || existingImage.alt !== imageToRemove.alt
        )
        setExistingImages(newImages)
    }, [existingImages, setExistingImages])

    useEffect(() => {
        return () => filesArray.forEach(file => URL.revokeObjectURL(file.preview))
    }, [filesArray])

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className={`${styles.dropzoneContent} ${isDragActive ? styles.dragActive : ''}`} style={style}>
                    <img src={UploadFile} alt='Upload' />
                    <div>{hint}</div>
                </div>
            </div>
            {(filesArray && filesArray.length > 0 || existingImages && existingImages.length > 0) && (
                <div className={styles.filePreviewContainer}>
                    {(existingImages && existingImages.length > 0) && (
                        <>
                            {existingImages.map((image, index) => (
                                <div
                                    key={`${image.alt}-${index}`}
                                    className={styles.filePreviewWrapper}
                                >
                                    <img src={image.src} alt={image.alt} className={styles.previewImage} />

                                    <button
                                        className={styles.deleteOverlay}
                                        onClick={() => removeExistingFile(image)}
                                    >
                                        <img src={Trashcan} alt='Delete' />
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                    {filesArray.map((file, index) => (
                        <div
                            key={`${file.name}-${index}`}
                            className={styles.filePreviewWrapper}
                        >
                            <img src={file.preview} alt={file.name} className={styles.previewImage} />

                            <button
                                className={styles.deleteOverlay}
                                onClick={() => removeFile(file)}
                            >
                                <img src={Trashcan} alt='Delete' />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default FileUpload