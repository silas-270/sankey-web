import TextButton from '@atoms/TextButton'
import TextInput from '@atoms/TextInput'
import InfoPoint from '@molecules/InfoPoint'
import styles from './InitialLink.module.css'

const InitialLink = ({
    source,
    setSource,
    target,
    setTarget,
    setTutorialStage
}) => {
    const onSubmit = () => {
        if (!source) {
            console.warn('Source Id Missing')
            return
        }
        if (!target) {
            console.warn('Target Id Missing')
            return
        }
        if (source === target) {
            console.warn('Source and Target Id cannot be the same')
            return
        }
        setTutorialStage(1)
    }

    return (
        <div className={styles.InitialLink}>
            <div className={styles.inputWrapper}>
                <div className={styles.infoHeadlineWrapper}>
                    <div className='head1'>
                        {'Set the first Link'}
                    </div>
                    <InfoPoint
                        text={'A Link sets up the transfer route between two budgets'}
                        position={'bottomleft'}
                        style={{ fontSize: '1.6rem' }}
                        tooltipWidth={'15rem'}
                    />
                </div>
            </div>
            <div className={styles.inputWrapper}>
                <div className='head3' style={{ width: '100%' }}>
                    {'Choose a name for the source node'}
                </div>
                <TextInput
                    value={source}
                    onChange={setSource}
                    placeholder={'Source Id'}
                />
                <div className='head3' style={{ width: '100%' }} >
                    {'Choose a name for the target node'}
                </div>
                <TextInput
                    value={target}
                    onChange={setTarget}
                    placeholder={'Target Id'}
                />
            </div>
            <div className={styles.buttonBar}>
                <TextButton
                    label={'Confirm Link Names'}
                    type='green'
                    onClick={onSubmit}
                />
            </div>
        </div>
    )
}

export default InitialLink