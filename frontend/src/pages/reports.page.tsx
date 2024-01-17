import {useReports} from "../hooks/useReports";
import {Fragment, useState} from "react";
import {GetReport} from "../../wailsjs/go/main/App";

type Report = {
  name: string;
  date: string;
  size: number;
}

export default function ReportsPage() {
  const {data, refetch} = useReports();
  const [report, useReport] = useState('')

  if (!data) {
    return <div>NO DATA</div>
  }

  if (report) {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: report}}></div>
        <button onClick={() => useReport('')}>Back</button>
      </div>
    )
  }

  const reports: Report[] = JSON.parse(data)
  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <p>This page defaulty looks for ./reports from the pwd, in the future there will be a settings tab for this, for now you should output reports to this folder</p>
      <button onClick={() => refetch()}>Refresh</button>
      <div className="reports-table">
        <p>NAME</p> <p>DATE</p> <p>SIZE</p>
        {reports.map((report) => {
          return (
            <Fragment key={report.name}>
              <p style={{
                cursor: 'pointer',
                color: 'blue',
                textDecoration: 'underline'
              }} onClick={() => {
                GetReport(report.name).then((data) => {
                  useReport(data)
                })
              }}>{report.name}</p>
              <p>{report.date}</p>
              <p>{report.size}</p>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

