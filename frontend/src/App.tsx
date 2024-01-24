import './App.css'
import * as Tabs from '@radix-ui/react-tabs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ScanPage from './pages/scan.page'
import DocsPage from './pages/docs.page'
import ReportsPage from './pages/reports.page'

export const queryClient = new QueryClient()

function App() {
  return (
    <div id="App">
      <QueryClientProvider client={queryClient}>
        <Tabs.Root className="tab-layout" defaultValue="docs" orientation="vertical">
          <Tabs.List className="left-menu" aria-label="left-menu-tabs">
            <Tabs.Trigger value="docs">Docs</Tabs.Trigger>
            <Tabs.Trigger value="scan">Scan</Tabs.Trigger>
            <Tabs.Trigger value="reports">Reports</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className="tab-content" value="docs">
            <DocsPage></DocsPage>
          </Tabs.Content>
          <Tabs.Content className="tab-content" value="scan">
            <ScanPage></ScanPage>
          </Tabs.Content>
          <Tabs.Content className="tab-content" value="reports"><ReportsPage></ReportsPage></Tabs.Content>
        </Tabs.Root>
      </QueryClientProvider>
    </div>
  )
}

export default App
