import {
  Table,
  TableCell,
  Typography,
  Box,
  Tab,
  TableRow,
  TableHead,
} from "@mui/material";
import carService from "../services/car.service";
import { useEffect, useState } from "react";
import React from "react";

function R1CarDetail({ id }) {
  const [report, setReport] = useState([]);

  function init() {
    carService
      .getReport(id)
      .then((response) => {
        setReport(response.data);
      })
      .catch((error) => {
        console.log("An error occurred while trying to show report 1.", error);
      });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <React.Fragment>
        <TableHead>
          <TableRow>
            <TableCell align="center">Fecha de ingreso del vehiculo</TableCell>
            <TableCell align="center">
              Descuento por numero de reparaciones
            </TableCell>
            <TableCell align="center">Descuento por dia de atención</TableCell>
            <TableCell align="center">Recargo por kilometraje</TableCell>
            <TableCell align="center">Recargo por antiguedad</TableCell>
            <TableCell align="center">
              Recargo por retraso en la recogida del vehiculo
            </TableCell>
            <TableCell align="center">Descuento por bono</TableCell>
            <TableCell align="center">Precio final</TableCell>
          </TableRow>
        </TableHead>
        {report.map((item, index) => (
          <TableRow key={index}>
            <TableCell align="center">{item[0]}</TableCell>
            <TableCell align="center">{item[3] * 100}</TableCell>
            <TableCell align="center">{item[2] * 100}</TableCell>
            <TableCell align="center">{item[6] * 100}</TableCell>
            <TableCell align="center">{item[5] * 100}</TableCell>
            <TableCell align="center">{item[4] * 100}</TableCell>
            <TableCell align="center">{item[1]}</TableCell>
            <TableCell align="center">{item[7]}</TableCell>
          </TableRow>
        ))}
      </React.Fragment>
    </>

    // <>
    // <TableCell align='center'>
    //   sada</TableCell>
    //   <TableCell align='center'>
    //     asd</TableCell></>
  );
}

export default R1CarDetail;
