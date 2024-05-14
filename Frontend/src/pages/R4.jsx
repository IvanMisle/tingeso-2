import R4NumberCars from "../components/R4NumberCars";
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
import { useEffect, useState } from "react";
import typeRepairService from "../services/typeRepair.service";

function R4() {
  const [types, setTypes] = useState([]);

  function init() {
    typeRepairService
      .getTotalAmount()
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.log("An error occurred while trying to show report 2.", error);
      });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
      <h1>Reporte 4</h1>
      <p>
        Listado de los 11 tipos de reparaciones vs el número de vehículos según
        tipo de motor (gasolina, diesel, hibrido, eléctrico) que se repararon y
        el monto total que representa dichas reparaciones. (Ordenar de mayor a
        menor por monto)
      </p>
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
              <TableCell align="center">Tipo de Reparación</TableCell>
              <TableCell align="center">Gasolina</TableCell>
              <TableCell align="center">Diésel</TableCell>
              <TableCell align="center">Híbrido</TableCell>
              <TableCell align="center">Eléctrico</TableCell>
              <TableCell align="center">Monto total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type[0]}>
                <TableCell align="center">{type[1]}</TableCell>
                <R4NumberCars
                  number={type[0]}
                  typeCar="Gasolina"
                />
                <R4NumberCars
                  number={type[0]}
                  typeCar="Diésel"
                />
                <R4NumberCars
                  number={type[0]}
                  typeCar="Híbrido"
                />
                <R4NumberCars
                  number={type[0]}
                  typeCar="Eléctrico"
                />
                <TableCell align="center">{type[2]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default R4;
