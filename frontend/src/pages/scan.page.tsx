import {RunCommand} from "../../wailsjs/go/main/App";
import * as Tabs from "@radix-ui/react-tabs";
import {useGlobalState} from "../hooks/useGlobalState";
import {useConsoleOutput} from "../hooks/useConsoleOutput";
import {FC, Fragment} from "react";

export default function ScanPage() {
  const [command, setCommand] = useGlobalState<string>(['command'], '')
  const [isRunning, setIsRunning] = useGlobalState<boolean>(['isRunning'], false);
  const {data: consoleOutput, dataUpdatedAt, status, isRefetching} = useConsoleOutput();

  return (
    <div className="scan-page-layout">
      <Tabs.Root defaultValue="scanning" orientation="horizontal">
        <Tabs.List aria-label="left-menu-tabs">
          <Tabs.Trigger value="scanning">Scanning</Tabs.Trigger>
          <Tabs.Trigger value="output">Output</Tabs.Trigger>
          <Tabs.Trigger value="performance">Performance</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="scanning"> <OptionsTable title={"Scanning options"} options={scanningOptions}></OptionsTable> </Tabs.Content>
        <Tabs.Content value="output"><OptionsTable title={"Output options"} options={outputOptions}></OptionsTable></Tabs.Content>
        <Tabs.Content value="performance"><OptionsTable title={"Performance options"} options={performanceOptions}></OptionsTable></Tabs.Content>
      </Tabs.Root>

      <div>
        <h1>Scan</h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          if (!command || isRunning) return
          setIsRunning(true);
          setCommand('')
          void RunCommand(command).then(() => {
            setIsRunning(false);
          });
        }} className="input-box">
          <input className="input" value={command} onChange={(e: any) => setCommand(e.target.value)} autoComplete="off" name="input" type="text"/>
          <button disabled={isRunning} className="btn" type="submit">run
          </button>
        </form>
        Loading console: {status}, {isRefetching + ''} <br/>
        Command running: {isRunning + ''} <br/>
        {new Date(dataUpdatedAt).toLocaleTimeString()}
        <pre>
            {consoleOutput}
        </pre>
      </div>
    </div>
  )
}

const scanningOptions: ScanOption[] = [
  {option: '10.10.10.0/24', description: 'Target network range.'},
  {option: '-sn', description: 'Disable port scanning.'},
  {option: '-Pn', description: 'Disables ICMP Echo Requests'},
  {option: '-n', description: 'Disables DNS Resolution.'},
  {option: '-PE', description: 'Performs the ping scan by using ICMP Echo Requests against the target.'},
  {option: '--packet-trace', description: 'Shows all packets sent and received.'},
  {option: '--reason', description: 'Displays the reason for a specific result.'},
  {option: '--disable-arp-ping', description: 'Disables ARP Ping Requests.'},
  {option: '--top-ports=<num>', description: 'Scans the specified top ports that have been defined as most frequent.'},
  {option: '-p-', description: 'Scan all ports.'},
  {option: '-p22-110', description: 'Scan all ports between 22 and 110.'},
  {option: '-p22,25', description: 'Scans only the specified ports 22 and 25.'},
  {option: '-F', description: 'Scans top 100 ports.'},
  {option: '-sS', description: 'Performs a TCP SYN-Scan.'},
  {option: '-sA', description: 'Performs a TCP ACK-Scan.'},
  {option: '-sU', description: 'Performs a UDP Scan.'},
  {option: '-sV', description: 'Scans the discovered services for their versions.'},
  {option: '-sC', description: 'Perform a Script Scan with scripts that are categorized as "default".'},
  {option: '--script <script>', description: 'Performs a Script Scan by using the specified scripts.'},
  {option: '-O', description: 'Performs an OS Detection Scan to determine the OS of the target.'},
  {option: '-A', description: 'Performs OS Detection, Service Detection, and traceroute scans.'},
  {option: '-D RND:5', description: 'Sets the number of random Decoys that will be used to scan the target.'},
  {option: '-e', description: 'Specifies the network interface that is used for the scan.'},
  {option: '-S 10.10.10.200', description: 'Specifies the source IP address for the scan.'},
  {option: '-g', description: 'Specifies the source port for the scan.'},
  {option: '--dns-server <ns>', description: 'DNS resolution is performed by using a specified name server.'},
  {option: '-sP', description: 'Performs a ping scan only.'},
  {option: '-PP', description: 'Uses ICMP Timestamp Request as a ping method.'},
  {option: '-PS', description: 'Sends TCP SYN packets to the specified ports.'}
];
const outputOptions: ScanOption[] = [
  {option: '-oA filename', description: 'Stores the results in all available formats starting with the name of "filename".'},
  {option: '-oN filename', description: 'Stores the results in normal format with the name "filename".'},
  {option: '-oG filename', description: 'Stores the results in "grepable" format with the name of "filename".'},
  {option: '-oX filename', description: 'Stores the results in XML format with the name of "filename".'},
  {option: '--append-output', description: 'Appends to existing output files rather than overwriting them.'},
  {option: '--resume', description: 'Resumes a scan using a given log file.'},
  {option: '--stylesheet PATH', description: 'Applies a given XSL stylesheet to the XML output.'}
];
const performanceOptions: ScanOption[] = [
  {option: '--max-retries <num>', description: 'Sets the number of retries for scans of specific ports.'},
  {option: '--stats-every=5s', description: "Displays scan's status every 5 seconds."},
  {option: '-v/-vv', description: 'Displays verbose output during the scan.'},
  {option: '--initial-rtt-timeout 50ms', description: 'Sets the specified time value as initial RTT timeout.'},
  {option: '--max-rtt-timeout 100ms', description: 'Sets the specified time value as maximum RTT timeout.'},
  {option: '--min-rate 300', description: 'Sets the number of packets that will be sent simultaneously.'},
  {option: '-T <0-5>', description: 'Specifies the specific timing template.'},
  {option: '--host-timeout TIME', description: 'Sets the time to wait for a host to respond.'},
  {option: '--scan-delay TIME', description: 'Sets the delay between sending packets.'},
  {option: '--max-scan-delay TIME', description: 'Sets the maximum delay between packets.'}
];

interface ScanOption {
  option: string;
  description: string;
}

interface OptionsTableProps {
  title: string;
  options: ScanOption[];
}

const OptionsTable: FC<OptionsTableProps> = ({title, options}) => {
  const [command, setCommand] = useGlobalState<string>(['command'])

  return (
    <>
      <h3>{title}</h3>
      <div className="scan-page-table">
        <div>Nmap Option</div>
        <div>Description</div>
        {options.map((opt, index) => (
          <Fragment key={index}>
            <div onClick={() => {
              setCommand((command || "") + " " + opt.option)
            }}>{opt.option}</div>
            <div>{opt.description}</div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
