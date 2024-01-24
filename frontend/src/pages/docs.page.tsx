import * as Tabs from '@radix-ui/react-tabs'

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
    <>
      <pre>
        {
          'This app is a simple Nmap wrapper. It allows you to run Nmap commands and see the output in real-time. \n'
          + 'This app has 3 tabs, Docs, Scan, and Reports. \n'
          + 'Docs page has a documentation about this app, link to the nmap documentation it self, and some basic info about this app \n'
          + 'Scan page is where you can run nmap commands \n'
          + 'Reports page is a place for viewing exported reports from nmap \n \n'
          + 'Now lets get to this app docs: \n'
          + 'This app is build with Go , Wails and React, React query and radix ui with some really simple styles \n'
          + 'Its a simple app that allows you to run nmap commands and see the output in real-time \n'
          + 'I built it because i kept forgetting all the options for nmap and wanted to have a simple way to run nmap commands and view the reports \n'
          + 'It has build it table with options for working with nmap with options that you can click for simple command creation \n'
          + 'As it only runs on your machine, i kept the functionality to run any commands, but its mostly just for nmap'
        }
      </pre>
    </>
  )
}

function NmapDocs() {
  return (
    <>
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
    </>
  )
}
