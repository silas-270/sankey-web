import { pool } from '../../services/db/db.js'

const getLinks = async (userId) => {
    // 1. Fetch all links for the given user ID
    const linksQuery = `
        SELECT id, source, target, created_at
        FROM links
        WHERE user_id = $1
        ORDER BY id;
    `
    const linksResult = await pool.query(linksQuery, [userId])
    const links = linksResult.rows

    if (links.length === 0) {
        return[] // Return an empty array if no links are found
    }

    // 2. Extract all link IDs to fetch updates in a single query
    const linkIds = links.map(link => link.id)

    // 3. Fetch all updates for the retrieved link IDs
    // The 'ANY($1::VARCHAR[])' syntax is used to query against an array of IDs
    const updatesQuery = `
        SELECT update_id, link_id, name, created_at, value, meta
        FROM updates
        WHERE link_id = ANY($1::UUID[])
        ORDER BY created_at DESC;
    `

    // The second argument in pool.query must be an array of values,
    // where the first element is the array of link IDs itself.
    const updatesResult = await pool.query(updatesQuery, [linkIds]);
    const allUpdates = updatesResult.rows;

    // 4. Map the updates back to their corresponding links.
    const linksMap = new Map(links.map(link => [
        link.id,
        {
            id: link.id,
            source: link.source,
            target: link.target,
            value: 0.0, // Initialize value entry
            history: [], // Initialize history array
            created_at: link.created_at
        }
    ]))

    allUpdates.forEach(update => {
        const linkEntry = linksMap.get(update.link_id)
        if (linkEntry) {
            linkEntry.value += parseFloat(update.value)

            linkEntry.history.push({
                id: update.update_id,
                name: update.name,
                value: parseFloat(update.value),
                meta: update.meta,
                created_at: update.created_at
            })
        }
    })

    // 5. Set links array
    const linksArray = Array.from(linksMap.values())

    // 6. Extract nodes from links
    const nodeIds = new Set()
    linksArray.forEach(linkEntry => {
        nodeIds.add(linkEntry.source)
        nodeIds.add(linkEntry.target)
    })
    const nodeArray = Array.from(nodeIds).map(id => ({ id }))

    return { nodes: nodeArray, links: linksArray}
}

export default getLinks