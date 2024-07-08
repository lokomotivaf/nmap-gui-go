import * as Tabs from '@radix-ui/react-tabs'
import markdownContent from './docs/app.md?raw'

export default function DocsPage() {
  return (
    <div className="docs-page">
      <h1>Docs</h1>
      <Tabs.Root defaultValue="this" orientation="horizontal">
        <Tabs.List aria-label="left-menu-tabs">
          <Tabs.Trigger value="this">This</Tabs.Trigger>
          <Tabs.Trigger value="nmap">Nmap</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="this">
          <AppDocs />
        </Tabs.Content>
        <Tabs.Content value="nmap">
          <NmapDocs />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

function AppDocs() {
  return (
    <pre>
      {markdownContent}
      {/* TODO ADD FORMATING USING MARKED */}
    </pre>
  )
}

function NmapDocs() {
  return (
    <a
      style={{
        marginTop: '16px',
        fontSize: '1.5rem',
        marginBottom: '1rem',
        display: 'block',
        textAlign: 'center',
        color: 'var(--1st-text-color)',
      }}
      href="https://nmap.org/book/toc.html"
    >
      Nmap Documentation Link
    </a>
  )
}
