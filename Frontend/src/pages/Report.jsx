import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import repairService from "../services/repair.service";
import dayjs from "dayjs";

function Report() {
  const [report, setReport] = useState([]);

  function init() {
    repairService
      .getReport()
      .then((response) => {
        setReport(response.data);
      })
      .catch((error) => {
        console.log(
          "An error occurred while trying to show list of all repairs.",
          error
        );
      });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
      <TableContainer component={Paper} sx ={{ mt: 2 }}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="a dense table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Patente Vehiculo</TableCell>
              <TableCell align="center">Marca Vehiculo</TableCell>
              <TableCell align="center">Modelo Vehiculo</TableCell>
              <TableCell align="center">Tipo Vehiculo</TableCell>
              <TableCell align="center">Año Fabricación</TableCell>
              <TableCell align="center">Tipo Motor</TableCell>
              <TableCell align="center">Fecha Ingreso Taller</TableCell>
              <TableCell align="center">Hora Ingreso Taller</TableCell>
              <TableCell align="center">Monto Total Reparaciones</TableCell>
              <TableCell align="center">Monto Recargos</TableCell>
              <TableCell align="center">Monto Dctos</TableCell>
              <TableCell align="center">SUB Total</TableCell>
              <TableCell align="center">Monto IVA</TableCell>
              <TableCell align="center">Costo Total</TableCell>
              <TableCell align="center">Fecha Salida Taller</TableCell>
              <TableCell align="center">Hora Salida Taller</TableCell>
              <TableCell align="center">Fecha Retiro Cliente</TableCell>
              <TableCell align="center">Hora Retiro Cliente</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.licensePlate}</TableCell>
                <TableCell align="center">{item.brand}</TableCell>
                <TableCell align="center">{item.model}</TableCell>
                <TableCell align="center">{item.type}</TableCell>
                <TableCell align="center">{item.manufactureYear}</TableCell>
                <TableCell align="center">{item.typeEngine}</TableCell>
                <TableCell align="center">
                  {dayjs(item.dateTimeEntry).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell align="center">
                  {dayjs(item.dateTimeEntry).format("HH:mm:ss")}
                </TableCell>
                <TableCell align="center">{item.amount}</TableCell>
                <TableCell align="center">{item.totalFee}</TableCell>
                <TableCell align="center">{item.totalDiscount}</TableCell>
                <TableCell align="center">
                  {item.finalCost - item.iva}
                </TableCell>
                <TableCell align="center">{item.iva}</TableCell>
                <TableCell align="center">{item.finalCost}</TableCell>
                <TableCell align="center">
                  {item.dateTimeExit
                    ? dayjs(item.dateTimeExit).format("YYYY-MM-DD")
                    : "Sin asignar"}
                </TableCell>
                <TableCell align="center">
                  {item.dateTimeExit
                    ? dayjs(item.dateTimeExit).format("HH:mm:ss")
                    : "Sin asignar"}
                </TableCell>
                <TableCell align="center">
                  {item.dateTimePickUp
                    ? dayjs(item.dateTimePickUp).format("YYYY-MM-DD")
                    : "Sin asignar"}
                </TableCell>
                <TableCell align="center">
                  {item.dateTimePickUp
                    ? dayjs(item.dateTimePickUp).format("HH:mm:ss")
                    : "Sin asignar"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Report;
