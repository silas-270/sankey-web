import styles from './NotesField.module.css'

const NotesField = ({
    notes,
    setNotes
}) => {
    return (
        <div className={styles.NotesField}>
            <textarea
                className={styles.notesTextarea}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={'Add your notes here...'}
            />
        </div>
    )
}

export default NotesField