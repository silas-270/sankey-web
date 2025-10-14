import { useState } from 'react'
import ModalTemplate from '@molecules/Modals/Template'
import useSankey from '@services/hooks/useSankey'
import InitialLink from './InitialLink'
import InitialUpdate from './InitialUpdate'
import styles from './Tutorial.module.css'

const Tutorial = () => {
    const { addLink } = useSankey()
    const [tutorialStage, setTutorialStage] = useState(0)
    const [linkData, setLinkData] = useState({
        source: '',
        target: ''
    })
    const [updateData, setUpdateData] = useState({
        name: '',
        value: '',
        meta: null
    })

    let content
    switch (tutorialStage) {
        case 0:
            content = (
                <InitialLink
                    source={linkData.source}
                    setSource={(newSource) => setLinkData(prev => ({ ...prev, source: newSource }))}
                    target={linkData.target}
                    setTarget={(newTarget) => setLinkData(prev => ({ ...prev, target: newTarget }))}
                    setTutorialStage={setTutorialStage}
                />
            )
            break
        case 1:
            content = (
                <InitialUpdate
                    linkData={linkData}
                    name={updateData.name}
                    setName={(newName) => setUpdateData(prev => ({ ...prev, name: newName }))}
                    value={updateData.value}
                    setValue={(newValue) => setUpdateData(prev => ({ ...prev, value: newValue }))}
                    setTutorialStage={setTutorialStage}
                    addLink={addLink}
                />
            )
            break
    }

    return (
        <div className={styles.TutorialWrapper}>
            <ModalTemplate>
                {content}
            </ModalTemplate>
        </div>
    )
}

export default Tutorial