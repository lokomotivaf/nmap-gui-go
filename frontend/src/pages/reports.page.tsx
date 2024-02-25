import { Fragment, useState } from 'react'
import { GetReport } from '../../wailsjs/go/main/App'
import { useReports } from '../hooks/useReports'

interface Report {
  name: string
  date: string
  size: number
}

export default function ReportsPage() {
  const { data, refetch } = useReports()
  const [report, setReport] = useState('')

  if (!data) {
    return <div>NO DATA</div>
  }

  if (report) {
    return (
      <div>
        <pre>
          {report}
          {/* TODO CONVERT ALL XML TO HTML */}
        </pre>
        <button type="button" onClick={() => setReport('')}>Back</button>
      </div>
    )
  }

  const reports: Report[] = JSON.parse(data)
  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <p>This page defaulty looks for ./reports from the pwd, in the future there will be a settings tab for this, for now you should output reports to this folder</p>
      <button type="button" onClick={() => refetch()}>Refresh</button>
      <div className="reports-table">
        <p>NAME</p>
        <p>DATE</p>
        <p>SIZE</p>
        {reports.map((report) => {
          return (
            <Fragment key={report.name}>
              <p
                style={{
                  cursor: 'pointer',
                  color: 'blue',
                  textDecoration: 'underline',
                }}
                onClick={() => {
                  GetReport(report.name).then((data) => {
                    setReport(data)
                  })
                }}
              >
                {report.name}
              </p>
              <p>{report.date}</p>
              <p>{report.size}</p>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
