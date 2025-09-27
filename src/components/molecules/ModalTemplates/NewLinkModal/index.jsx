import TextInput from '@atoms/TextInput'
import SuggestionInput from '@atoms/SuggestionInput'
import TextButton from '@atoms/TextButton'
import styles from './NewLinkModal.module.css'

const NewLinkModal = ({
    ids,
    nodeInputPlaceholder,
    newSourceModal,
    connectingNode,
    setConnectingNode,
    nodeValue,
    setNodeValue,
    onClose,
    onSuccess
}) => (
    <div className={styles.NewLinkModal}>
        <div className={styles.headline}>{newSourceModal ? 'Enter Source' : 'Enter Expense'}</div>
        <div className={styles.inputBar}>
            <SuggestionInput
                style={{ 'flex': '3' }}
                value={connectingNode}
                onChange={setConnectingNode}
                placeholder={nodeInputPlaceholder}
                suggestions={ids}
            />
            <TextInput
                style={{ 'flex': '1' }}
                value={nodeValue}
                onChange={setNodeValue}
                placeholder={'Value'}
            />
        </div>
        <div className={styles.buttonBar}>
            <TextButton
                label={'Create'}
                onClick={onSuccess}
                type={'green'}
            />
            <TextButton
                label={'Cancel'}
                onClick={onClose}
            />
        </div>
    </div>
)

export default NewLinkModal
