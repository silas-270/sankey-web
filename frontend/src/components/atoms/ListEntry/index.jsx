import { useState } from 'react'
import Trashcan from '@assets/Trashcan.svg'
import styles from './ListEntry.module.css'

const ListEntry = ({
    name,
    source,
    target,
    value,
    color,
    editable,
    updateLinkValue,
    delteLink
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
            {editable ? (
                <button onClick={() => delteLink(source, target)} className={styles.square} style={{ backgroundColor: color }}>
                    <img src={Trashcan} alt='T' />
                </button>
            ) : (
                <div className={styles.square} style={{ backgroundColor: color }} />
            )}
            <div className={styles.name}>
                {name}
            </div>
            <input
                className={`${styles.value} ${editable && styles.pointer} ${styles.input}`}
                value={valueVal}
                onChange={e => setValueVal(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!editable}
            />
        </div>
    )
}

export default ListEntry