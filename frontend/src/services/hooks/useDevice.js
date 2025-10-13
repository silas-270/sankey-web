import { useEffect, useState } from 'react'

const useDevice = () => {
    const [isMobile, setIsMobile] = useState(false)
    const [deviceType, setDeviceType] = useState('desktop') // 'mobile', 'tablet', 'desktop'

    useEffect(() => {
        const checkDevice = () => {
            // 1. Check for Touch Capability (Media Query)
            const hasCoarsePointer = window.matchMedia('(pointer:coarse)').matches
            const canHover = window.matchMedia('(any-hover:hover)').matches

            // 2. Fallback/Confirmation via User Agent
            const userAgent = window.navigator.userAgent.toLowerCase()
            const isUserAgentMobile = /iphone|ipod|android|mobile/.test(userAgent)
            const isUserAgentTablet = /ipad|tablet/.test(userAgent)

            let calculatedDeviceType = 'desktop'

            if (isUserAgentMobile || (hasCoarsePointer && !canHover)) {
                calculatedDeviceType = 'mobile'
            } else if (isUserAgentTablet || (hasCoarsePointer && canHover)) {
                // Tablets often have touch (coarse pointer) but also a large screen 
                // and sometimes attached keyboards allowing them to hover.
                calculatedDeviceType = 'tablet'
            }
            
            setDeviceType(calculatedDeviceType)
            setIsMobile(calculatedDeviceType === 'mobile' || calculatedDeviceType === 'tablet')
        }

        checkDevice()
        window.addEventListener('resize', checkDevice)

        return () => window.removeEventListener('resize', checkDevice)
    }, [])

    return {
        isMobile,
        deviceType, // Provides more granular info
        width: window.innerWidth // Keep for layout adjustments
    }
}

export default useDevice