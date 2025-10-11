import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query'

import {
    useParams
} from 'react-router-dom'

import {
    fetchGetLinks,
    fetchAddLink,
    fetchPutLink,
    fetchDelLink,
    fetchAddUpdate,
    fetchPutUpdate,
    fetchDelUpdate
} from '../api/api'

const useSankey = () => {
    const queryClient = useQueryClient()
    const { user: userId } = useParams()

    const {
        data: sankeyData = { nodes: [], links: [] },
        isLoading,
        error,
        refetch
    } = useQuery({
        queryKey: ['sankey'],
        queryFn: () => fetchGetLinks(userId),
        staleTime: 1000 * 60 * 5,
        refetchInterval: 1000 * 60,
        refetchIntervalInBackground: true
    })

    const invalidateSankey = () => {
        queryClient.invalidateQueries({ queryKey: ['sankey'] })
    }

    // Mutation to create new Link
    const createLinkMutation = useMutation({ mutationFn: fetchAddLink, onSuccess: invalidateSankey })
    const addLink = (data) => createLinkMutation.mutate({...data, userId})

    // Mutation to update Link
    const updateLinkMutation = useMutation({ mutationFn: fetchPutLink, onSuccess: invalidateSankey })
    const putLink = (data) => updateLinkMutation.mutate({...data, userId})

    // Mutation to delete Link
    const deleteLinkMutation = useMutation({ mutationFn: fetchDelLink, onSuccess: invalidateSankey })
    const delLink = (data) => deleteLinkMutation.mutate({...data, userId})

    // Mutation to create new Update
    const createUpdateMutation = useMutation({ mutationFn: fetchAddUpdate, onSuccess: invalidateSankey })
    const addUpdate = (data) => createUpdateMutation.mutate({...data, userId})

    // Mutation to update Update
    const updateUpdateMutation = useMutation({ mutationFn: fetchPutUpdate, onSuccess: invalidateSankey })
    const putUpdate = (data) => updateUpdateMutation.mutate({...data, userId})

    // Mutation to delete Update
    const deleteUpdateMutation = useMutation({ mutationFn: fetchDelUpdate, onSuccess: invalidateSankey })
    const delUpdate = (data) => deleteUpdateMutation.mutate({...data, userId})

    return {
        sankeyData,
        isLoading,
        error,
        refetch,

        addLink,
        putLink,
        delLink,

        addUpdate,
        putUpdate,
        delUpdate
    }
}

export default useSankey