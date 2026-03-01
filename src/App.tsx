import './App.css'

function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-title-block">
          <h1 className="app-title">Glitch Video Dashboard</h1>
          <p className="app-subtitle">
            Lightweight status panel for the <code>glitch-video-editor</code> agents & tests.
          </p>
        </div>
        <nav className="app-nav">
          <button className="nav-chip" type="button">
            Overview
          </button>
          <button className="nav-chip" type="button">
            Agents
          </button>
          <button className="nav-chip" type="button">
            Tasks
          </button>
          <button className="nav-chip" type="button">
            Tests
          </button>
        </nav>
      </header>

      <main className="app-main">
        <section className="panel panel-agents">
          <header className="panel-header">
            <h2>Agents</h2>
            <p className="panel-description">
              High-level view of the workers involved in the video pipeline.
            </p>
          </header>
          <div className="panel-body placeholder-grid">
            <div className="placeholder-card">
              <h3 className="placeholder-title">Agent list</h3>
              <p className="placeholder-text">
                Later this will show live agent status coming from GitHub issues or a
                JSON status file in the <code>glitch-video-editor</code> repo.
              </p>
            </div>
            <div className="placeholder-card subtle">
              <p className="placeholder-label">Example fields</p>
              <ul className="placeholder-list">
                <li>Name / role</li>
                <li>Last heartbeat</li>
                <li>Current task</li>
                <li>Health (OK / degraded / blocked)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="panel panel-tasks">
          <header className="panel-header">
            <h2>Tasks</h2>
            <p className="panel-description">
              Queue of work items for the editor and related automation.
            </p>
          </header>
          <div className="panel-body placeholder-grid">
            <div className="placeholder-card">
              <h3 className="placeholder-title">Task board</h3>
              <p className="placeholder-text">
                This section will eventually mirror GitHub issues (by label / project)
                or consume a simple tasks JSON published by CI.
              </p>
            </div>
            <div className="placeholder-card subtle">
              <p className="placeholder-label">Example fields</p>
              <ul className="placeholder-list">
                <li>Title & short description</li>
                <li>Status (todo / in-progress / done)</li>
                <li>Owner / agent</li>
                <li>Linked PR or workflow run</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="panel panel-tests">
          <header className="panel-header">
            <h2>Tests</h2>
            <p className="panel-description">
              Logic checks and regression tests for the video pipeline.
            </p>
          </header>
          <div className="panel-body placeholder-grid">
            <div className="placeholder-card">
              <h3 className="placeholder-title">Latest runs</h3>
              <p className="placeholder-text">
                Here we can surface the most recent test results from CI artifacts,
                a <code>status.json</code>, or a dedicated GitHub issue that tracks the
                health of the test suite.
              </p>
            </div>
            <div className="placeholder-card subtle">
              <p className="placeholder-label">Example fields</p>
              <ul className="placeholder-list">
                <li>Suite / scenario name</li>
                <li>Pass / fail / flaky</li>
                <li>Run timestamp</li>
                <li>Link to logs or video artifacts</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Placeholder UI — wired for data later from{' '}
          <code>glitch-video-editor</code> via GitHub API or static JSON.
        </p>
      </footer>
    </div>
  )
}

export default App
