import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputLabel,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import reportService from "../services/report.service";
import React from "react";

function R1() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
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
      .getReport1(year, month)
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
      <TextField
        fullWidth
        id="year"
        label="Año"
        value={year}
        sx={{ mt: 2, mr: 2, width: 500 }}
        variant="filled"
        onChange={(e) => setYear(e.target.value)}
      />
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
        sx={{ mt: 2, width: 500 }}
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
                <TableCell align="left">Lista de reparaciones</TableCell>
                <TableCell align="center">Sedan</TableCell>
                <TableCell align="center">Hatchback</TableCell>
                <TableCell align="center">SUV</TableCell>
                <TableCell align="center">Pickup</TableCell>
                <TableCell align="center">Furgoneta</TableCell>
                <TableCell align="center">TOTAL</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell>{item.type}</TableCell>
                    <TableCell align="center">{item.sedanCount}</TableCell>
                    <TableCell align="center">{item.hatchbackCount}</TableCell>
                    <TableCell align="center">{item.suvCount}</TableCell>
                    <TableCell align="center">{item.pickupCount}</TableCell>
                    <TableCell align="center">{item.furgonetaCount}</TableCell>
                    <TableCell align="center">{item.totalCount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">
                      {item.sedanCost !== 0 ? item.sedanCost : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.hatchbackCost !== 0 ? item.hatchbackCost : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.suvCost !== 0 ? item.suvCost : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.pickupCost !== 0 ? item.pickupCost : "-"}
                    </TableCell>
                    <TableCell align="center">
                      {item.furgonetaCost !== 0 ? item.furgonetaCost : "-"}
                    </TableCell>
                    <TableCell align="center">{item.totalCost}</TableCell>
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

export default R1;
