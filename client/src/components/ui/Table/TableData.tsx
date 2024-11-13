import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type TableColumn = {
  id: string;
  label: string;
  align?: 'left' | 'right' | 'center';
};

interface TableProps {
  columns: TableColumn[];
  rows: any[];
  onRowClick?: (id: string) => void; // Tambahkan prop onRowClick
  selectedId?: string;
}

const TableData: React.FC<TableProps> = ({ columns, rows, onRowClick, selectedId }) => {
  return (
    <TableContainer 
      component={Paper} 
      sx={{
        maxHeight: 'calc(100vh - 300px)', // Set height to fill most of the viewport
        overflowY: 'auto', // Enable vertical scrolling
        minHeight: '100px', // Set minimum height for the table
        borderRadius: 0,
        boxShadow: 'none',
        border : 'none',
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#2c3e50', height: '20px' }}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align || 'left'}
                sx={{
                  color: '#fff', 
                  fontWeight: 'bold',
                  padding: '5px',
                  fontSize: '12px',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow 
              key={index}
              onClick={() => onRowClick && onRowClick(row.id)} // Panggil onRowClick dengan ID row
              sx={{
                cursor: 'pointer',
                backgroundColor: row.id === selectedId ? '#e0f7fa' : 'inherit', // Latar belakang khusus untuk baris terpilih
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={{
                    border: '1px solid #ddd', 
                    padding: '5px',
                    fontSize: '11px',
                    textAlign: column.align || 'left',
                  }}
                >
                  {row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
