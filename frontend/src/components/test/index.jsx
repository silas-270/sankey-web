import { useState } from 'react'
import useSankey from '@services/hooks/useSankey'

const TestUpload = () => {
    const { addUpdate } = useSankey()

    // Hardcoded params for testing:
    const linkId = '2959d166-31f5-4bd1-91d8-491e3b1c9660'
    const updateName = 'test'
    const updateValue = 20
    const initalMeta = JSON.stringify({ images: [] }) // Ensure meta is a JSON string

    // Files
    const [filesArray, setFilesArray] = useState([])

    // Handler to capture file selection
    const handleFileChange = (e) => {
        // Convert the FileList object (e.target.files) to a true Array
        if (e.target.files) {
            setFilesArray(Array.from(e.target.files));
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData()

        // 1. Append text fields
        formData.append('link_id', linkId)
        formData.append('name', updateName)
        formData.append('value', updateValue)
        formData.append('meta', initalMeta)

        // 2. Append files using the key 'images'
        filesArray.forEach((file) => {
            formData.append('images', file);
        })

        const result = await addUpdate({ formData })
        console.log(result)

        // Optional: Reset state and file input after submission
        setFilesArray([]);
        document.getElementById('file-upload-input').value = '';
    }

    return (
        <div>
            <h2>Test Update Upload with Images</h2>
            <p><strong>Link ID:</strong> {linkId}</p>
            <p><strong>Value:</strong> {updateValue}</p>

            {/* File Input */}
            <label htmlFor="file-upload-input">Select Receipt(s):</label>
            <input
                id="file-upload-input"
                type="file"
                multiple // Allows selection of multiple files
                onChange={handleFileChange}
                accept="image/*,application/pdf"
            />

            {/* Display selected file count */}
            <p>Selected Files: {filesArray.length}</p>
            {filesArray.length > 0 && (
                <ul>
                    {filesArray.map((file, index) => (
                        <li key={index}>{file.name} ({Math.round(file.size / 1024)} KB)</li>
                    ))}
                </ul>
            )}

            {/* Submission Button */}
            <button
                onClick={handleSubmit}
                disabled={filesArray.length === 0}
            >
                Submit Update
            </button>
        </div>
    )
}

export default TestUpload