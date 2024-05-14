import { useState, useEffect } from "react";
import carService from "../services/car.service";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import HandymanIcon from "@mui/icons-material/Handyman";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CarList() {
  const [cars, setCars] = useState([]);

  function init() {
    carService
      .getAll()
      .then((response) => {
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

  function deleteCar(id) {
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar este vehiculo?"
    );
    if (confirmDelete) {
      carService
        .remove(id)
        .then((response) => {
          console.log("Vehiculo ha sido eliminado.", response.data);
          init();
        })
        .catch((error) => {
          console.log("Error al eliminar el vehiculo", error);
        });
    }
  }

  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
      <Button
        component={NavLink}
        to="/addCar"
        sx={{ mt: 2, mb: 2 }}
        variant="outlined"
      >
        Añadir un Vehiculo Nuevo
      </Button>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="a dense table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Marca</TableCell>
              <TableCell align="center">Modelo</TableCell>
              <TableCell align="center">Tipo de vehiculo</TableCell>
              <TableCell align="center">Tipo de motor</TableCell>
              <TableCell align="center">Numero de patente</TableCell>
              <TableCell align="center">Kilometraje</TableCell>
              <TableCell align="center">Año</TableCell>
              <TableCell align="center">Numero de asientos</TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center">Ver reparaciones</TableCell>
              <TableCell align="center">Eliminar vehiculo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car.id}>
                <TableCell>{car.brand}</TableCell>
                <TableCell align="center">{car.model}</TableCell>
                <TableCell align="center">{car.type}</TableCell>
                <TableCell align="center">{car.typeEngine}</TableCell>
                <TableCell align="center">{car.licensePlate}</TableCell>
                <TableCell align="center">{car.mileage}</TableCell>
                <TableCell align="center">{car.manufactureYear}</TableCell>
                <TableCell align="center">{car.numberSeats}</TableCell>
                <TableCell align="center">
                  <IconButton
                    component={NavLink}
                    to={`/editCar/${car.id}`}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={NavLink}
                    to={`/repairList/${car.id}`}
                  >
                    <HandymanIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={NavLink}
                    onClick={() => deleteCar(car.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CarList;
