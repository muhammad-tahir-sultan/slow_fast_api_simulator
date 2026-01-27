import React from 'react';

interface OptimizationSettingsProps {
    useDataLoader: boolean;
    useIndexing: boolean;
    onToggleDataLoader: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleIndexing: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OptimizationSettings: React.FC<OptimizationSettingsProps> = ({
    useDataLoader,
    useIndexing,
    onToggleDataLoader,
    onToggleIndexing
}) => {
    return (
        <div className="card">
            <h2>🔧 Optimizations</h2>
            <div className="toggle-group">
                <label className="toggle-label">
                    <div>
                        <span style={{ display: 'block', fontWeight: 500 }}>Data Loader</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Solving N+1 Queries</span>
                    </div>
                    <input type="checkbox" style={{ display: 'none' }} checked={useDataLoader} onChange={onToggleDataLoader} />
                    <div className="toggle-switch"></div>
                </label>

                <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem 0' }}></div>

                <label className="toggle-label">
                    <div>
                        <span style={{ display: 'block', fontWeight: 500 }}>DB Indexing</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Optimizing Lookups</span>
                    </div>
                    <input type="checkbox" style={{ display: 'none' }} checked={useIndexing} onChange={onToggleIndexing} />
                    <div className="toggle-switch"></div>
                </label>
            </div>
        </div>
    );
};
