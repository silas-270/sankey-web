import { useState } from 'react'
import styles from './ListEntry.module.css'

const ListEntry = ({
    name,
    source,
    target,
    value,
    color,
    editable,
    updateLinkValue
}) => {
    const [valueVal, setValueVal] = useState(value)
    
    const handleUpdateLinkValue = () => {
        updateLinkValue(source, target, valueVal)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdateLinkValue()
            e.target.blur()
        }
    }

    return (
        <div className={styles.ListEntry}>
            <div className={styles.square} style={{ backgroundColor: color }} />
            <div className={styles.name}>
                {name}
            </div>
            <input
                className={`${styles.value} ${styles.input}`}
                value={valueVal}
                onChange={e => setValueVal(e.target.value)}
                onKeyDown={handleKeyDown} // <-- Add the key down handler here
                disabled={!editable}
            />
        </div>
    )
}

export default ListEntry