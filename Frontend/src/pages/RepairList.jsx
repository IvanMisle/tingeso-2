import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import repairService from "../services/repair.service";
import bonusService from "../services/bonus.service";
import Types from "../components/Types";
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
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import dayjs from "dayjs";
import BonoRepair from "../components/BonoRepair";
import EditButtonRepair from "../components/EditButtonRepair";

function RepairList() {
  const { id } = useParams();
  const [repairs, setRepairs] = useState([]);

  function init() {
    repairService
      .getByIdCar(id)
      .then((response) => {
        setRepairs(response.data);
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

  function deleteRepair(id) {
    const confirmDelete = window.confirm(
      "¿Esta seguro que desea borrar esta reparacion?"
    );
    if (confirmDelete) {
      repairService
        .remove(id)
        .then((response) => {
          console.log("Reparacion ha sido eliminada.", response.data);
          init();
        })
        .catch((error) => {
          console.log("Error al eliminar la reparacion", error);
        });
    }
  }

  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
      <Button
        component={NavLink}
        to="/carList"
        startIcon={<KeyboardBackspaceIcon />}
        sx={{ position: "absolute", left: 10, mt: 2 }}
        variant="outlined"
      >
        Regresar
      </Button>
      <Button
        component={NavLink}
        to={`/addRepair/${id}`}
        sx={{ mt: 2, mb: 2 }}
        variant="outlined"
      >
        Añadir una nueva reparacion
      </Button>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="a dense table"
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Fecha y hora de entrada</TableCell>
              <TableCell align="center">Monto base</TableCell>
              <TableCell align="center">Fecha y hora de salida</TableCell>
              <TableCell align="center">Fecha y hora de retiro</TableCell>
              <TableCell align="center">Reparaciones a realizar</TableCell>
              <TableCell align="center">Bono</TableCell>
              <TableCell align="center">Editar</TableCell>
              <TableCell align="center">Ver detalles</TableCell>
              <TableCell align="center">Eliminar reparacion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repairs.map((repair, index) => (
              <TableRow key={repair.id}>
                <TableCell>
                  {dayjs(repair.dateTimeEntry).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell align="center">{repair.amount}</TableCell>
                <TableCell align="center">
                  {dayjs(repair.dateTimeExit).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell align="center">
                  {dayjs(repair.dateTimePickUp).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell align="center">
                  <h1>types</h1>
                </TableCell>
                <TableCell align="center">
                  <h1>
                    bonus
                  </h1>
                </TableCell>
                <TableCell align="center">
                  <h1>
                    edit button
                  </h1>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={NavLink}
                    to={`/detailRepair/${repair.id}/${id}`}
                  >
                    <LocalLibraryIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={NavLink}
                    onClick={() => deleteRepair(repair.id)}
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

export default RepairList;
