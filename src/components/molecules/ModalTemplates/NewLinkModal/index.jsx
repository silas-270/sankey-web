import TextInput from '@atoms/TextInput'
import TextButton from '@atoms/TextButton'
import styles from './NewLinkModal.module.css'

const NewLinkModal = ({
    connectingNode,
    setConnectingNode,
    nodeValue,
    setNodeValue,
    onClose,
    onSuccess
}) => (
    <div className={styles.NewLinkModal}>
        <TextInput
            value={connectingNode}
            onChange={setConnectingNode}
            placeholder={'Source Node'}
        />
        <TextInput
            value={nodeValue}
            onChange={setNodeValue}
            placeholder={'Connection Value'}
        />
        <div className='divider' />
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
