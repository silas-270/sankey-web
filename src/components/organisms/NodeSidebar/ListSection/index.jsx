import ListEntry from '@atoms/ListEntry'
import styles from './ListSection.module.css'

const ListSection = ({
    title,
    target,
    editable,
    amount,
    entryList,
    delteLink,
    handleCreateNew,
    updateLinkValue,
    buttonLabel
}) => {

    return (
        <>
            <div className={styles.headerWrapper}>
                <div>{title}</div>
                {amount && (<div>{`${amount}$`}</div>)}
            </div>
            <div className={styles.listContainer}>
                {entryList.map((entry) => (
                    <ListEntry
                        key={target ? entry.target.id : entry.source.id}
                        name={target ? entry.target.id : entry.source.id}
                        delteLink={delteLink}
                        source={entry.source.id}
                        target={entry.target.id}
                        value={entry.value}
                        color={target ? entry.target.color : entry.source.color}
                        editable={editable}
                        updateLinkValue={updateLinkValue}
                    />
                ))}
                {editable && (
                    <button
                        className={styles.newEntryBtn}
                        onClick={handleCreateNew}
                    >
                        {buttonLabel}
                    </button>
                )}
            </div>
        </>
    )
}

export default ListSection
