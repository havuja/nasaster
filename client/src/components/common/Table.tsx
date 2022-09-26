import * as React from "react";
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type TableProps<T> = {
  headers: [keyof T, string][];
  rows: T[];
  useKey: keyof T;
  testId?: string;
};

export default function Table<T>(props: TableProps<T>) {
  const { headers, rows, useKey, testId = "component" } = props;

  return (
    <TableContainer component={Paper}>
      <MuiTable
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        data-testid={`table-${testId}`}
      >
        <TableHead>
          <TableRow>
            {headers.map(([field, label]) => (
              <TableCell key={field as string}>{label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={`row-${row[useKey]}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {headers.map(([field]) => (
                <TableCell
                  component="th"
                  scope="row"
                  key={`cell-${String(field)}`}
                >
                  {row[field] as React.ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
