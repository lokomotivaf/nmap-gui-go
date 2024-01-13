import * as Tabs from "@radix-ui/react-tabs";

export default function DocsPage() {
  return (
    <div className="docs-page">
      <h1>Docs</h1>
      <Tabs.Root defaultValue="this" orientation="horizontal">
        <Tabs.List aria-label="left-menu-tabs">
          <Tabs.Trigger value="this">This</Tabs.Trigger>
          <Tabs.Trigger value="nmap">Nmap</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content  value="this">
          <AppDocs/>
        </Tabs.Content>
        <Tabs.Content value="nmap">
          <NmapDocs/>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}


function AppDocs() {
  return (
    <>
      <p>This app serves as a gui client for nmap. In order to use this app you need to have nmap installed and in your PATH variable as it primary works by calling the binary, or you can include the path to the executable in the setting tab</p>
    </>
  )
}

function NmapDocs() {
  return (
    <>
      <a href="https://nmap.org/book/toc.html">Nmap Documentation</a>
    </>
  )
}
