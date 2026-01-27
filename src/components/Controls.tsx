import React from 'react';

interface ControlsProps {
    onSeed: () => void;
    onFetchSimple: () => void;
    onFetchPaginated: () => void;
    loading: {
        seeding: boolean;
        fetchingSimple: boolean;
        fetchingPaginated: boolean;
        anyFetching: boolean;
    };
}

export const Controls: React.FC<ControlsProps> = ({ onSeed, onFetchSimple, onFetchPaginated, loading }) => {
    return (
        <div className="card">
            <h2>⚙️ Controls</h2>
            <div className="btn-group">
                <button className="btn btn-secondary" onClick={() => onSeed()} disabled={loading.anyFetching}>
                    {loading.seeding ? 'Creating Data...' : '🌱 Seed Database (Run 1st)'}
                </button>
                <button className="btn btn-primary" onClick={onFetchSimple} disabled={loading.anyFetching}>
                    {loading.fetchingSimple ? '⏳ Crunching Data...' : '🐢 Fetch All (Simulate Slow)'}
                </button>
                <button className="btn btn-accent" onClick={onFetchPaginated} disabled={loading.anyFetching}>
                    {loading.fetchingPaginated ? '✨ Loading...' : '🚀 Fetch Paginated (Fast)'}
                </button>
            </div>
        </div>
    );
};
