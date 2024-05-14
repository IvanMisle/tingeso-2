import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import carService from "../services/car.service";
import R1CarDetail from "../components/R1CarDetail";

function R1() {
  const [cars, setCars] = useState([]);

  function init() {
    carService
      .getCarsWithTicket()
      .then((response) => {
        console.log("List of all cars has been obtained.", response.data);
        setCars(response.data);
      })
      .catch((error) => {
        console.log(
          "An error occurred while trying to show list of all cars.",
          error
        );
      });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
      <h1>Reporte 1</h1>
      <p>
        Listado donde se muestren (para cada vehículo) todos los valores
        involucrados en el cálculo de la fórmula
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
              <TableCell align="center">Vehiculo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell align="center">
                  {car.brand} {car.model} {car.manufactureYear}
                </TableCell>
                <R1CarDetail id={car.id} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default R1;
