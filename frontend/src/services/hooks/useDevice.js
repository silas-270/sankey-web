import { useEffect, useState } from 'react'

const useDevice = () => {
    const [isMobile, setIsMobile] = useState(false)
    const [test, setTest] = useState(null)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 600)
            setTest(window.innerWidth)
        }

        checkMobile() // Initial check
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return {
        isMobile,
        test
    }
}

export default useDevice