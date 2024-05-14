import R2NumberCars from "../components/R2NumberCars";
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

function R2() {
  const [ready, setReady] = useState(false);
  const [types, setTypes] = useState([]);

  function init() {
    typeRepairService
      .getTotalAmount()
      .then((response) => {
        console.log("Report 2 has been obtained.", response.data);
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
      <h1>Reporte 2</h1>
      <p>
        Listado de los 11 tipos de reparaciones vs el número de tipos de
        vehículos que se repararon y el monto total que representa dichas
        reparaciones. (Ordenar de mayor a menor por monto)
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
              <TableCell align="center">Sedán</TableCell>
              <TableCell align="center">Hatchback</TableCell>
              <TableCell align="center">SUV</TableCell>
              <TableCell align="center">Pickup</TableCell>
              <TableCell align="center">Furgoneta</TableCell>
              <TableCell align="center">Monto total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type[0]}>
                <TableCell align="center">{type[1]}</TableCell>
                <R2NumberCars
                  number={type[0]}
                  typeCar="Sedán"
                />
                <R2NumberCars
                  number={type[0]}
                  typeCar="Hatchback"
                />
                <R2NumberCars
                  number={type[0]}
                  typeCar="SUV"
                />
                <R2NumberCars
                  number={type[0]}
                  typeCar="Pickup"
                />
                <R2NumberCars
                  number={type[0]}
                  typeCar="Furgoneta"
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

export default R2;
