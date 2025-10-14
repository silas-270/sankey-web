import { formatValue } from '@services/data/formatEntries'
import validateLink from '@services/data/validateLink'
import TextButton from '@atoms/TextButton'
import TextInput from '@atoms/TextInput'
import InfoPoint from '@molecules/InfoPoint'
import LinkNode from '@organisms/DiagramSidebar/LinkNode'
import styles from './InitialUpdate.module.css'

const InitialUpdate = ({
    linkData,
    name,
    setName,
    value,
    setValue,
    setTutorialStage,
    addLink
}) => {
    const link = {
        source: {
            id: linkData.source,
            color: '#2a9d90'
        },
        target: {
            id: linkData.target,
            color: '#e07b7b'
        },
        value: 0
    }

    const onSubmit = () => {
        const formattedValue = formatValue(value)
        const newLink = {
            source: linkData.source,
            target: linkData.target,
            update: {
                name: name,
                value: formattedValue,
                meta: null
            }
        }
        const { success, message } = validateLink({ nodes: [], links: [] }, newLink)
        if (!success) {
            console.warn(message)
            return
        }
        console.log(newLink)
        addLink(newLink)
    }

    return (
        <div className={styles.InitialUpdate}>
            <div className={styles.inputWrapper}>
                <div className='head1'>
                    {'You made your first Link!'}
                </div>
            </div>
            <div className={styles.nodeLayout}>
                <div style={{ flexGrow: 1 }}>
                    <LinkNode
                        link={link}
                        isTarget={true}
                        editable={false}
                        selectedLink={''}
                    />
                </div>
                <div className={styles.nodeText}>
                    {'⇨'}
                </div>
                <div style={{ flexGrow: 1 }}>
                    <LinkNode
                        link={link}
                        isTarget={false}
                        editable={false}
                        selectedLink={''}
                    />
                </div>
            </div>
            <div className={styles.inputWrapper}>
                <div className={styles.infoHeadlineWrapper}>
                    <div className='head2'>
                        {'Connect a transaction to it'}
                    </div>
                    <InfoPoint
                        text={'Sets the initial value of the link'}
                        position={'bottomleft'}
                        style={{ fontSize: '1.6rem' }}
                        tooltipWidth={'15rem'}
                    />
                </div>
                <TextInput
                    value={name}
                    onChange={setName}
                    placeholder={'Transaction Name'}
                />
                <TextInput
                    value={value}
                    onChange={setValue}
                    placeholder={'Initial Value eg 10.00$'}
                />
            </div>
            <div className={styles.buttonBar}>
                <TextButton
                    label={'Go Back'}
                    onClick={() => setTutorialStage(0)}
                />
                <TextButton
                    label={'Start Diagram'}
                    type='green'
                    onClick={onSubmit}
                />
            </div>
        </div>
    )
}

export default InitialUpdate