export const formatDateToISO = (date) => {
    const regexFull = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/
    const regexDateOnly = /^(\d{2})\.(\d{2})\.(\d{4})$/

    let day, month, year, hours, minutes
    const matchFull = date.match(regexFull)
    const matchDateOnly = date.match(regexDateOnly)

    if (matchFull) {
        [, day, month, year, hours, minutes] = matchFull
    } else if (matchDateOnly) {
        [, day, month, year] = matchDateOnly
        hours = '00'
        minutes = '00'
    } else {
        return null
    }

    const monthIndex = parseInt(month, 10) - 1

    const dateObject = new Date(Date.UTC(
        parseInt(year, 10),
        monthIndex,
        parseInt(day, 10),
        parseInt(hours, 10),
        parseInt(minutes, 10),
        0
    ))

    if (isNaN(dateObject.getTime())) {
        return null
    }

    return dateObject.toISOString()
}

export const formatDateFromISO = (date) => {
    const dateObject = new Date(date)
    if (isNaN(dateObject.getTime())) {
        return ''
    }

    const day = String(dateObject.getUTCDate()).padStart(2, '0')
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0')
    const year = dateObject.getUTCFullYear()
    const hours = String(dateObject.getUTCHours()).padStart(2, '0')
    const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const formatValue = (value, allowNegative) => {
    // Allowed formats: 10.00 || 10,00 || 10.00X || 10,00X (Whe X is a currency symbol like $ or €)
    // Output null if no match, output fotmatted float if match
    if (!value) {
        return null
    }
    
    const strValue = value.toString()
    const trimmedValue = strValue.trim()

    const basePattern = /(\d+)([\.,]\d+)?([^\w\s]*)?$/
    const fullPattern = allowNegative
        ? /^-?\s*/.source + basePattern.source
        : /^\s*/.source + basePattern.source
    const regex = new RegExp(fullPattern)

    const match = trimmedValue.match(regex)

    if (match) {
        let numberString = match[0].trim()

        const currencySymbolMatch = numberString.match(/([^\w\s])$/)
        if (currencySymbolMatch && currencySymbolMatch[1]) {
            numberString = numberString.slice(0, -currencySymbolMatch[1].length).trim()
        }
        numberString = numberString.replace(',', '.')
        const formattedFloat = parseFloat(numberString)

        if (!isNaN(formattedFloat)) {
            if (!allowNegative && formattedFloat === 0) {
                return null
            }
            return formattedFloat
        }
    }
}