import {useState} from 'react';
import './App.css';
import * as Tabs from '@radix-ui/react-tabs';
import ScanPage from "./pages/scan.page";
import DocsPage from "./pages/docs.page";

function App() {
  return (
    <div id="App">
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
        <Tabs.Content className="tab-content" value="reports">Tab three content</Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default App
