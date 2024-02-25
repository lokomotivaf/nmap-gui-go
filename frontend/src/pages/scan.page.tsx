import * as Tabs from '@radix-ui/react-tabs'
import { RunCommand } from '../../wailsjs/go/main/App'
import { useGlobalState } from '../hooks/useGlobalState'
import { useConsoleOutput } from '../hooks/useConsoleOutput'
import { outputOptions, performanceOptions, scanningOptions } from './optionTableData'
import OptionsTable from './optionTable'

export default function ScanPage() {
  const [command, setCommand] = useGlobalState<string>(['command'], '')
  const [isRunning, setIsRunning] = useGlobalState<boolean>(['isRunning'], false)
  const { data: consoleOutput, dataUpdatedAt, status, isRefetching } = useConsoleOutput()

  return (
    <div className="scan-page-layout">
      <Tabs.Root defaultValue="scanning" orientation="horizontal">
        <Tabs.List aria-label="left-menu-tabs">
          <Tabs.Trigger value="scanning">Scanning</Tabs.Trigger>
          <Tabs.Trigger value="output">Output</Tabs.Trigger>
          <Tabs.Trigger value="performance">Performance</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="scanning"><OptionsTable title="Scanning options" options={scanningOptions}></OptionsTable></Tabs.Content>
        <Tabs.Content value="output"><OptionsTable title="Output options" options={outputOptions}></OptionsTable></Tabs.Content>
        <Tabs.Content value="performance"><OptionsTable title="Performance options" options={performanceOptions}></OptionsTable></Tabs.Content>
      </Tabs.Root>

      <div>
        <h1>Scan</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (!command || isRunning)
              return
            setIsRunning(true)
            setCommand('')
            void RunCommand(command).then(() => {
              setIsRunning(false)
            })
          }}
          className="input-box"
        >
          <input className="input" value={command} onChange={(e: any) => setCommand(e.target.value)} autoComplete="off" name="input" type="text" />
          <button disabled={isRunning} className="btn" type="submit">
            run
          </button>
        </form>
        Loading console:
        {' '}
        {status}
        ,
        {' '}
        {`${isRefetching}`}
        {' '}
        <br />
        Command running:
        {' '}
        {`${isRunning}`}
        {' '}
        <br />
        {new Date(dataUpdatedAt).toLocaleTimeString()}
        <pre>
          {consoleOutput}
        </pre>
      </div>
    </div>
  )
}
