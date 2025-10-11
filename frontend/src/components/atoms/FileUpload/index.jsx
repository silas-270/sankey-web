import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadFile from '@assets/UploadFile.svg'
import styles from './FileUpload.module.css'

const FileUpload = ({
    hint,
    fileList,
    style
}) => {
    const onDrop = useCallback(acceptedFiles => {
        // Add logic for uploading later
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />

            <div className={`${styles.dropzoneContent} ${isDragActive ? styles.dragActive : ''}`} style={style}>
                <img src={UploadFile} alt='Upload' />
                <div>{hint}</div>
            </div>
        </div>
    )
}

export default FileUpload