import {RunCommand} from "../../wailsjs/go/main/App";
import {useState} from "react";
import * as Tabs from "@radix-ui/react-tabs";

export default function ScanPage() {
  const [resultText, setResultText] = useState("console");
  const [command, setCommand] = useState('');

  return (
    <div className="scan-page-layout">
      <Tabs.Root defaultValue="scanning" orientation="vertical">
        <Tabs.List aria-label="left-menu-tabs">
          <Tabs.Trigger value="scanning">Scanning</Tabs.Trigger>
          <Tabs.Trigger value="output">Output</Tabs.Trigger>
          <Tabs.Trigger value="performance">Performance</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="scanning">{scanningTabTemplate}</Tabs.Content>
        <Tabs.Content value="output">{optionsTabTemplate}</Tabs.Content>
        <Tabs.Content value="performance">{performanceTabTemplate}</Tabs.Content>
      </Tabs.Root>

      <div>
        <h1>Scan</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          //TODO could the run command be used with react query? because it returns a promise?
          RunCommand(command).then((result: string) => setResultText(result));
        }} className="input-box">
        <input className="input" onChange={(e: any) => setCommand(e.target.value)} autoComplete="off" name="input" type="text"/>
          <button className="btn" type="submit">run
          </button>
        </form>
        <pre>
           {resultText}
          </pre>
      </div>
    </div>
  )
}

// TODO components? SEPARATE WHOLE TABS? AND SCAN FORM? ADD GLOBAL STATE!?
const scanningTabTemplate = <>
  <h3>Scanning options</h3>
  <div className="scan-page-table">
    <div>Nmap Option</div>
    <div>Description</div>
    <div>10.10.10.0/24</div>
    <div>Target network range.</div>
    <div>-sn</div>
    <div>Disable port scanning.</div>
    <div>-Pn</div>
    <div>Disables ICMP Echo Requests</div>
    <div>-n</div>
    <div>Disables DNS Resolution.</div>
    <div>-PE</div>
    <div>Performs the ping scan by using ICMP Echo Requests against the target.</div>
    <div>--packet-trace</div>
    <div>Shows all packets sent and received.</div>
    <div>--reason</div>
    <div>Displays the reason for a specific result.</div>
    <div>--disable-arp-ping</div>
    <div>Disables ARP Ping Requests.</div>
    <div>--top-ports=&lt;num&gt;</div>
    <div>Scans the specified top ports that have been defined as most frequent.</div>
    <div>-p-</div>
    <div>Scan all ports.</div>
    <div>-p22-110</div>
    <div>Scan all ports between 22 and 110.</div>
    <div>-p22,25</div>
    <div>Scans only the specified ports 22 and 25.</div>
    <div>-F</div>
    <div>Scans top 100 ports.</div>
    <div>-sS</div>
    <div>Performs an TCP SYN-Scan.</div>
    <div>-sA</div>
    <div>Performs an TCP ACK-Scan.</div>
    <div>-sU</div>
    <div>Performs an UDP Scan.</div>
    <div>-sV</div>
    <div>Scans the discovered services for their versions.</div>
    <div>-sC</div>
    <div>Perform a Script Scan with scripts that are categorized as "default".</div>
    <div>--script &lt;script&gt;</div>
    <div>Performs a Script Scan by using the specified scripts.</div>
    <div>-O</div>
    <div>Performs an OS Detection Scan to determine the OS of the target.</div>
    <div>-A</div>
    <div>Performs OS Detection, Service Detection, and traceroute scans.</div>
    <div>-D RND:5</div>
    <div>Sets the number of random Decoys that will be used to scan the target.</div>
    <div>-e</div>
    <div>Specifies the network interface that is used for the scan.</div>
    <div>-S 10.10.10.200</div>
    <div>Specifies the source IP address for the scan.</div>
    <div>-g</div>
    <div>Specifies the source port for the scan.</div>
    <div>--dns-server &lt;ns&gt;</div>
    <div>DNS resolution is performed by using a specified name server.</div>
    <span>AI </span>
    <span>ADDITIONS</span>
    <div>-sP</div>
    <div>Performs a ping scan only.</div>
    <div>-PP</div>
    <div>Uses ICMP Timestamp Request as a ping method.</div>
    <div>-PS</div>
    <div>Sends TCP SYN packets to the specified ports.</div>
  </div>
</>
const optionsTabTemplate = <>
  <h3>Output options</h3>
  <div className="scan-page-table">
    <div>Nmap Option</div>
    <div>Description</div>
    <div>-oA filename</div>
    <div>Stores the results in all available formats starting with the name of "filename".</div>
    <div>-oN filename</div>
    <div>Stores the results in normal format with the name "filename".</div>
    <div>-oG filename</div>
    <div>Stores the results in "grepable" format with the name of "filename".</div>
    <div>-oX filename</div>
    <div>Stores the results in XML format with the name of "filename".</div>
    <span>AI </span>
    <span>ADDITIONS</span>
    <div>--append-output</div>
    <div>Appends to existing output files rather than overwriting them.</div>
    <div>--resume</div>
    <div>Resumes a scan using a given log file.</div>
    <div>--stylesheet PATH</div>
    <div>Applies a given XSL stylesheet to the XML output.</div>
  </div>
</>
const performanceTabTemplate = <>
  <h3>Performance options</h3>
  <div className="scan-page-table">
    <div>Nmap Option</div>
    <div>Description</div>
    <div>--max-retries &lt;num&gt;</div>
    <div>Sets the number of retries for scans of specific ports.</div>
    <div>--stats-every=5s</div>
    <div>Displays scan's status every 5 seconds.</div>
    <div>-v/-vv</div>
    <div>Displays verbose output during the scan.</div>
    <div>--initial-rtt-timeout 50ms</div>
    <div>Sets the specified time value as initial RTT timeout.</div>
    <div>--max-rtt-timeout 100ms</div>
    <div>Sets the specified time value as maximum RTT timeout.</div>
    <div>--min-rate 300</div>
    <div>Sets the number of packets that will be sent simultaneously.</div>
    <div>-T &lt;0-5&gt;</div>
    <div>Specifies the specific timing template.</div>
    <span>AI </span>
    <span>ADDITIONS</span>
    <div>--host-timeout TIME</div>
    <div>Sets the time to wait for a host to respond.</div>
    <div>--scan-delay TIME</div>
    <div>Sets the delay between sending packets.</div>
    <div>--max-scan-delay TIME</div>
    <div>Sets the maximum delay between packets.</div>
  </div>
</>
