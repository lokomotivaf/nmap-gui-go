import type { FC } from 'react'
import { Fragment } from 'react'
import { useGlobalState } from '../hooks/useGlobalState'
import type { OptionsTableProps } from './optionTableData'

const OptionsTable: FC<OptionsTableProps> = ({ title, options }) => {
  const [command, setCommand] = useGlobalState<string>(['command'])

  return (
    <>
      <h3>{title}</h3>
      <div className="scan-page-table">
        <div>Nmap Option</div>
        <div>Description</div>
        {options.map(opt => (
          <Fragment key={opt.option}>
            <div onClick={() => {
              setCommand(`${command || 'nmap'} ${opt.option}`)
            }}
            >
              {opt.option}
            </div>
            <div>{opt.description}</div>
          </Fragment>
        ))}
      </div>
    </>
  )
}

export default OptionsTable
