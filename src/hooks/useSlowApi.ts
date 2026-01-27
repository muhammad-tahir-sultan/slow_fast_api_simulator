import { useMutation, useLazyQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { MUTATION_SEED, QUERY_USERS, QUERY_USERS_PAGINATED, MUTATION_TOGGLE_NPLUS1, MUTATION_TOGGLE_INDEXING } from '../graphql';

declare global {
    interface Window {
        startTime: number;
    }
}

export const useSlowApi = () => {
    const [responseTime, setResponseTime] = useState<number | null>(null);
    const [dataMode, setDataMode] = useState<'simple' | 'paginated'>('simple');
    const [paginationCursor, setPaginationCursor] = useState<string | null>(null);

    // States for toggles
    const [useDataLoader, setUseDataLoader] = useState(true);
    const [useIndexing, setUseIndexing] = useState(true);

    const [seedDatabase, { loading: seeding }] = useMutation(gql(MUTATION_SEED), {
        onCompleted: () => toast.success('Database Seeded Successfully! 🚀'),
        onError: (err) => toast.error('Seeding failed: ' + err.message)
    });

    const [toggleNPlus1] = useMutation(gql(MUTATION_TOGGLE_NPLUS1));
    const [toggleIndexing] = useMutation(gql(MUTATION_TOGGLE_INDEXING));

    const handleToggleDataLoader = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.checked;
        setUseDataLoader(newVal);
        const promise = toggleNPlus1({ variables: { enable: newVal } });
        toast.promise(promise, {
            loading: 'Toggling DataLoader...',
            success: `DataLoader turned ${newVal ? 'ON' : 'OFF'}`,
            error: 'Failed to toggle DataLoader'
        });
    };

    const handleToggleIndexing = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = e.target.checked;
        setUseIndexing(newVal);
        const promise = toggleIndexing({ variables: { enable: newVal } });
        toast.promise(promise, {
            loading: 'Toggling Indexing...',
            success: `Indexing turned ${newVal ? 'ON' : 'OFF'}`,
            error: 'Failed to toggle Indexing'
        });
    };

    const [fetchUsers, { loading: fetchingSimple, data: dataSimple }] = useLazyQuery(gql(QUERY_USERS), {
        fetchPolicy: 'network-only',
        onCompleted: () => {
            const end = performance.now();
            setResponseTime(Math.round(end - window.startTime));
            setDataMode('simple');
            toast.success('Fetch Complete!');
        },
        onError: (err) => toast.error('Fetch failed: ' + err.message)
    });

    const [fetchUsersPaginated, { loading: fetchingPaginated, data: dataPaginated, fetchMore }] = useLazyQuery(gql(QUERY_USERS_PAGINATED), {
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
            const end = performance.now();
            if (!paginationCursor) {
                setResponseTime(Math.round(end - window.startTime));
                toast.success('Paginated Fetch Complete!');
            }
            setDataMode('paginated');
            if (data.usersPaginated.pageInfo.endCursor) {
                setPaginationCursor(data.usersPaginated.pageInfo.endCursor);
            }
        },
        onError: (err) => toast.error('Paginated Fetch failed: ' + err.message)
    });

    const handleFetch = () => {
        setResponseTime(null);
        setPaginationCursor(null);
        window.startTime = performance.now();
        fetchUsers();
    };

    const handleFetchPaginated = () => {
        setResponseTime(null);
        setPaginationCursor(null);
        window.startTime = performance.now();
        fetchUsersPaginated({ variables: { limit: 10, cursor: null } });
    };

    const loadMore = () => {
        if (!dataPaginated?.usersPaginated.pageInfo.hasNextPage) return;
        fetchMore({
            variables: {
                cursor: dataPaginated.usersPaginated.pageInfo.endCursor,
                limit: 10
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return {
                    usersPaginated: {
                        ...fetchMoreResult.usersPaginated,
                        edges: [
                            ...prev.usersPaginated.edges,
                            ...fetchMoreResult.usersPaginated.edges
                        ]
                    }
                };
            }
        })
    };

    const activeData = dataMode === 'simple' ? dataSimple?.users : dataPaginated?.usersPaginated.edges.map((e: any) => e.node);
    const hasNextPage = dataMode === 'paginated' && dataPaginated?.usersPaginated.pageInfo.hasNextPage;

    return {
        // State
        responseTime,
        dataMode,
        activeData,
        hasNextPage,
        useDataLoader,
        useIndexing,
        loading: {
            seeding,
            fetchingSimple,
            fetchingPaginated,
            anyFetching: seeding || fetchingSimple || fetchingPaginated
        },
        // Handlers
        seedDatabase,
        handleFetch,
        handleFetchPaginated,
        loadMore,
        handleToggleDataLoader,
        handleToggleIndexing
    };
};
