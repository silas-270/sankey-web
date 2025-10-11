import { useState } from 'react'
import useSankey from '@services/hooks/useSankey'
import { validateLinkEntries, validateLinkArray } from '@services/hooks/validateSankeyData'
import JsonUpload from '../../atoms/JsonUpload'
import TextInput from '@atoms/TextInput'
import TextButton from '@atoms/TextButton'
import styles from './InitialNodeDisplay.module.css'

const Caret = () => (
    <svg
        height="12"
        width="12"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 12 12"
    >
        <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            d="M2 4l4 4 4-4"
        />
    </svg>
)

const InitialNodeDisplay = () => {
    const { addLink } = useSankey()
    const [sourceId, setSourceId] = useState('')
    const [budgetId, setBudgetId] = useState('')
    const [updateValue, setUpdateValue] = useState('')

    const [showImportOption, setShowImportOption] = useState(false)
    const [fileName, setFileName] = useState(null)
    const [diagramData, setDiagramData] = useState(null)

    const startDiagram = () => {
        if (!diagramData) {
            const errors = validateLinkEntries(sourceId, budgetId, updateValue, true)
            if (!errors) {
                const firstUpdate = { value: updateValue }
                addLink({ source: sourceId, target: budgetId, update: firstUpdate })
                console.log({ sourceId, budgetId })
            }
        } else {
            const result = validateLinkArray(diagramData)
            if (result) {
                diagramData.forEach(entry => {
                    const { source, target, value } = entry
                    addLink(source, target, value)
                })
            } else {
                console.warn('Invalid JSON')
            }
        }
    }

    return (
        <div className={styles.DashboardStarter}>
            <div className={styles.inputForm}>
                <div className={styles.inputWrapper} style={{ 'fontSize': '1.9rem' }}>
                    {'Initial Information'}
                </div>

                <div className={styles.inputWrapper}>
                    <TextInput
                        value={sourceId}
                        onChange={setSourceId}
                        placeholder={'Source Id'}
                    />
                    <TextInput
                        value={budgetId}
                        onChange={setBudgetId}
                        placeholder={'Budget Id'}
                    />
                </div>
                <div className={styles.inputWrapper}>
                    <TextInput
                        value={updateValue}
                        onChange={setUpdateValue}
                        placeholder={'First Value'}
                    />
                </div>

                <button
                    className={`${styles.caretBtn} ${showImportOption ? styles.open : ''}`}
                    onClick={() => setShowImportOption(prev => !prev)}
                >
                    <Caret />
                    <div>Advanced Options</div>
                </button>

                {showImportOption && (
                    <JsonUpload
                        setDiagramData={setDiagramData}
                        fileName={fileName}
                        setFileName={setFileName}
                    />
                )}

                <TextButton
                    label={'Generate Diagram'}
                    onClick={startDiagram}
                    type='green'
                    style={{ 'width': '20rem' }}
                />
            </div>
        </div>
    )
}

export default InitialNodeDisplay