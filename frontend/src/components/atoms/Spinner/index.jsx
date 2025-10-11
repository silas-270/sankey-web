import styles from './Spinner.module.css'

const Spinner = ({ style }) => {
    const segments = Array.from({ length: 12 }, (_, i) => (
        <div key={i} className={styles.blade} />
    ))

    return (
        <div className={styles.spinner} style={style}>
            {segments}
        </div>
    )
}

export default Spinner