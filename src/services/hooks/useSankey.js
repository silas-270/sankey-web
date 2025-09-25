import { useState, useCallback, useMemo } from "react";

const testData = [
    {
        "source": "Source 1",
        "target": "Budget 1",
        "value": 30
    },
    {
        "source": "Source 2",
        "target": "Budget 1",
        "value": 70
    },
    {
        "source": "Source 1",
        "target": "Budget 2",
        "value": 70
    },
    {
        "source": "Source 2",
        "target": "Budget 2",
        "value": 30
    },
    {
        "source": "Budget 1",
        "target": "Expense",
        "value": 50
    }
]

// Custom Hook to manage the Sankey data
const useSankey = (initialLinks = testData) => {
    const [links, setLinks] = useState(initialLinks);
    
    // formatData is now a memoized value derived from `links`
    // It will automatically update whenever `links` changes.
    const formatData = useMemo(() => {
        const nodeIds = new Set();
        links.forEach(link => {
            nodeIds.add(link.source);
            nodeIds.add(link.target);
        });
        const nodes = Array.from(nodeIds).map(id => ({ id }));
        return { nodes, links };
    }, [links]); // Dependency array: this runs only when `links` changes

    // Now, your update functions only need to update `links`
    const addLink = useCallback((sourceId, targetId, value) => {
        const newLink = { source: sourceId, target: targetId, value };
        setLinks(currentLinks => [...currentLinks, newLink]);
    }, []); // No dependency on `links` needed if using the function form of setState

    const updateNodeId = useCallback((oldId, newId) => {
        setLinks(currentLinks => currentLinks.map(link => ({
            ...link,
            source: link.source === oldId ? newId : link.source,
            target: link.target === oldId ? newId : link.target
        })));
    }, []);

    const updateLinkValue = useCallback((sourceId, targetId, newValue) => {
        setLinks(currentLinks => currentLinks.map(link =>
            link.source === sourceId && link.target === targetId
                ? { ...link, value: newValue }
                : link
        ));
    }, []);

    return {
        formatData,
        addLink,
        updateNodeId,
        updateLinkValue,
    };
};

export default useSankey;