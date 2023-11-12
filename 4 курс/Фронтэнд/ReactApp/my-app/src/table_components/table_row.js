import TableCell from './table_cell.js'

const TableRow = ({ row }) => {
  return (
    <tr>
      {row.map((item) => (
        <TableCell text={item} />
      ))}
    </tr>
  )
}

export default TableRow