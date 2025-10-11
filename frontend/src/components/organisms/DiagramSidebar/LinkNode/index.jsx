import { useState } from 'react'
import AddUpdateModal from '@molecules/Modals/AddUpdateModal'
import PutLinkModal from '@molecules/Modals/PutLinkModal'
import UpdateNode from '../UpdateNode'
import Tooltip from '@atoms/Tooltip'
import Edit from '@assets/Edit.svg'
import Add from '@assets/Add.svg'
import styles from './LinkNode.module.css'

const LinkNode = ({
    link,
    setSelectedLink,
    selectedLink,
    isTarget,
    editable,
    nodeList
}) => {
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const nodeData = isTarget ? link.source : link.target

    const handleOnClick = () => {
        if (selectedLink == link.id) {
            setSelectedLink('')
        } else {
            setSelectedLink(link.id)
        }
    }

    return (
        <>
            <div className={styles.LinkNode}>
                <div className={styles.NodeButton}>
                    {editable ? (
                        <div className={styles.squareButton} style={{ backgroundColor: nodeData.color }}>
                            <Tooltip text={'Edit Link'}>
                                <button className={styles.svgButton} onClick={() => setShowLinkModal(true)}>
                                    <img src={Edit} alt='T' />
                                </button>
                            </Tooltip>
                            <Tooltip text={'New Transaction'}>
                                <button className={styles.svgButton} onClick={() => setShowUpdateModal(true)}>
                                    <img src={Add} alt='T' />
                                </button>
                            </Tooltip>
                        </div>
                    ) : (
                        <div className={styles.square}
                            style={{ backgroundColor: nodeData.color }}
                        />
                    )}
                    <button className={styles.nameValueWrapper} onClick={handleOnClick} disabled={!editable}>
                        <div className={styles.name}>{nodeData.id}</div>
                        <div className={styles.value}>
                            {`${link.value.toFixed(2)}$`}
                        </div>
                    </button>
                </div>
                {(selectedLink == link.id) && (
                    <>
                        <div className={styles.divider} />
                        {link.history && (
                            <div className={styles.updateList}>
                                {link.history.map((update, index) => (
                                    <UpdateNode
                                        key={index}
                                        link={link}
                                        update={update}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
            {showLinkModal && (
                <PutLinkModal
                    onClose={() => setShowLinkModal(false)}
                    nodeList={nodeList}
                    link={link}
                />
            )}
            {showUpdateModal && (
                <AddUpdateModal
                    onClose={() => setShowUpdateModal(false)}
                    nodeList={nodeList}
                    link={link}
                />
            )}
        </>
    )
}

export default LinkNode