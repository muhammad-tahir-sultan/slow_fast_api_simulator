import React from 'react';

interface ResultsDisplayProps {
    responseTime: number | null;
    activeData: any[] | undefined;
    hasNextPage: boolean;
    onLoadMore: () => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ responseTime, activeData, hasNextPage, onLoadMore }) => {
    return (
        <div className="card" style={{ minHeight: '400px' }}>
            {responseTime !== null ? (
                <div className="metric-card">
                    <span className="metric-label">Response Time</span>
                    <span className={`metric-value ${responseTime < 200 ? 'status-fast' : 'status-slow'}`}>
                        {responseTime}ms
                    </span>
                    <div className={`badge ${responseTime < 200 ? 'badge-fast' : 'badge-slow'}`} style={{ display: 'inline-block' }}>
                        {responseTime < 200 ? '🚀 Production Ready' : '🐌 Improvement Needed'}
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', border: '2px dashed var(--border)', borderRadius: '16px' }}>
                    Run a test to see metrics
                </div>
            )}

            {activeData && (
                <div className="data-preview-container animate-fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ margin: 0 }}>📊 Payload Preview <span style={{ fontSize: '0.8em', opacity: 0.6 }}>({activeData.length} items)</span></h3>
                        {hasNextPage && (
                            <button className="btn btn-secondary" style={{ width: 'auto', padding: '0.5rem 1rem' }} onClick={onLoadMore}>Load More 👇</button>
                        )}
                    </div>
                    <pre className="code-block">
                        {JSON.stringify(activeData.slice(0, 3), null, 2)}
                        {activeData.length > 3 && `\n... and ${activeData.length - 3} more items`}
                    </pre>
                </div>
            )}
        </div>
    );
};
