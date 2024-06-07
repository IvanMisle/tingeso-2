import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useState } from "react";
import reportService from "../services/report.service";
import React from "react";

function R2() {
  const [month, setMonth] = useState("");
  const [flag, setFlag] = useState(false);
  const [report, setReport] = useState([]);
  const months = [
    { name: "Enero", number: 1 },
    { name: "Febrero", number: 2 },
    { name: "Marzo", number: 3 },
    { name: "Abril", number: 4 },
    { name: "Mayo", number: 5 },
    { name: "Junio", number: 6 },
    { name: "Julio", number: 7 },
    { name: "Agosto", number: 8 },
    { name: "Septiembre", number: 9 },
    { name: "Octubre", number: 10 },
    { name: "Noviembre", number: 11 },
    { name: "Diciembre", number: 12 },
  ];

  function getReport(e) {
    e.preventDefault();
    reportService
      .getReport2(month)
      .then((response) => {
        setReport(response.data);
        setFlag(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
      <FormControl
        fullWidth
        sx={{ mt: 2, textAlign: "left", width: 500 }}
      >
        <InputLabel id="type">Mes</InputLabel>
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          variant="filled"
        >
          {months.map((item, index) => (
            <MenuItem
              key={index}
              value={item.number}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{ mt: 3.5, width: 500, ml: 2 }}
        onClick={(e) => getReport(e)}
      >
        Generar Reporte
      </Button>
      {flag && (
        <TableContainer
          component={Paper}
          sx={{ mt: 2 }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-label="a dense table"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">MES</TableCell>
                <TableCell align="center">
                  {months[report[0].month1 - 1].name}
                </TableCell>
                <TableCell align="center">% Variacion</TableCell>
                <TableCell align="center">
                  {months[report[0].month2 - 1].name}
                </TableCell>
                <TableCell align="center">% Variacion</TableCell>
                <TableCell align="center">
                  {months[report[0].month3 - 1].name}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="center">{item.month1Count}</TableCell>
                    <TableCell align="center">
                      {item.var21Count !== null ? item.var21Count : "-"}
                    </TableCell>
                    <TableCell align="center">{item.month2Count}</TableCell>
                    <TableCell align="center">
                      {item.var32Count !== null ? item.var32Count : "-"}
                    </TableCell>
                    <TableCell align="center">{item.month3Count}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">
                      {item.month1Cost !== 0 ? item.month1Cost : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.var21Cost !== null ? item.var21Cost : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.month2Cost !== 0 ? item.month2Cost : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.var32Cost !== null ? item.var32Cost : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.month3Cost !== 0 ? item.month3Cost : "-"}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default R2;
