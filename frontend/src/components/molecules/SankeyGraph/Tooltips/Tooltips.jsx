import styles from './Tooltips.module.css'

export const CustomNodeTooltip = ({ node }) => (
    <div className={styles.CustomNodeTooltip}>
        <div style={{ 'display': 'flex', 'flexDirection': 'row', 'gap': '0.5rem', 'alignItems': 'center' }}>
            <div className={styles.rect} style={{ 'backgroundColor': `${node.color}` }} />
            <div>{node.id}</div>
        </div>
    </div>
)

export const CustomLinkTooltip = ({ link }) => (
    <div className={styles.CustomNodeTooltip}>
        <div style={{ 'display': 'flex', 'flexDirection': 'row', 'gap': '0.5rem', 'alignItems': 'center' }}>
            <div className={styles.rect} style={{ 'backgroundColor': `${link.source.color}` }} />
            <div>{link.source.id}</div>
            <div className={styles.arrow}>{`↦`}</div>
            <div className={styles.rect} style={{ 'backgroundColor': `${link.target.color}` }} />
            <div>{link.target.id}</div>
        </div>
    </div>
)