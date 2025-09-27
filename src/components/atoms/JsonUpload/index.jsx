import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import UploadFile from '@assets/UploadFile.svg'
import CheckFile from '@assets/CheckFile.svg'
import styles from './JsonUpload.module.css'

const JsonUpload = ({
    setDiagramData,
    fileName,
    setFileName
}) => {
    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]

            if (file.size === 0) {
                console.warn("Error: The dropped file is empty.")
                setFileName(null)
                setDiagramData(null)
                return
            }

            // Update file name for display
            setFileName(file.name)

            // Use FileReader to read the file content
            const reader = new FileReader()

            reader.onload = (event) => {
                try {
                    // Get the text content from the file
                    const jsonString = event.target.result;

                    // Parse the JSON string into a JavaScript object
                    const parsedData = JSON.parse(jsonString);

                    // 3. Save the parsed JSON object to state
                    setDiagramData(parsedData);
                } catch (error) {
                    console.error("Error reading or parsing file:", error);
                    // Handle errors (e.g., clear states, show error message)
                    setFileName(null);
                    setDiagramData(null);
                }
            }
            reader.readAsText(file)
        }
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'application/json': ['.json'],
        }
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />

            <div className={`${styles.dropzoneContent} ${isDragActive ? styles.dragActive : ''}`}>
                <img src={fileName ? CheckFile : UploadFile} alt='Upload' />
                <div>{fileName ? fileName : 'Import Diagram'}</div>
            </div>
        </div>
    )
}

export default JsonUpload
