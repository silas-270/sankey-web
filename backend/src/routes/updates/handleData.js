export const findMissingImageIds = (prevMeta, newMeta) => {
    if (!prevMeta || !prevMeta.images) return []
    if (!newMeta || !newMeta.images) newMeta = { images: [] }

    let diffedIds = []

    const newImageSrcs = new Set(newMeta.images.map(image => image.src))

    const imagesToDelete = prevMeta.images.filter(image => !newImageSrcs.has(image.src))

    diffedIds = imagesToDelete.map((image) => {
        const src = image.src;
        // This splits the URL by '/' and takes the last part (the filename/Key)
        const parts = src.split('/')
        return parts[parts.length - 1]
    })

    return diffedIds
}