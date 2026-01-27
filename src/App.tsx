import { useSlowApi } from './hooks/useSlowApi';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { OptimizationSettings } from './components/OptimizationSettings';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Toaster } from 'react-hot-toast';
import './index.css';

function App() {
  const api = useSlowApi();

  return (
    <div className="animate-fade-in">
      <Toaster position="top-right" toastOptions={{ style: { background: '#2d3139', color: '#fff' } }} />
      <Header />

      <div className="dashboard-grid">
        <div className="controls-container">
          <Controls
            onSeed={api.seedDatabase}
            onFetchSimple={api.handleFetch}
            onFetchPaginated={api.handleFetchPaginated}
            loading={api.loading}
          />

          <OptimizationSettings
            useDataLoader={api.useDataLoader}
            useIndexing={api.useIndexing}
            onToggleDataLoader={api.handleToggleDataLoader}
            onToggleIndexing={api.handleToggleIndexing}
          />
        </div>

        <div className="results-container">
          <ResultsDisplay
            responseTime={api.responseTime}
            activeData={api.activeData}
            hasNextPage={!!api.hasNextPage}
            onLoadMore={api.loadMore}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
