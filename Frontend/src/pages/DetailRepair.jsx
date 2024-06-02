import { useEffect, useState } from "react";
import repairService from "../services/repair.service";
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
} from "@mui/material";
import { useParams, NavLink } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dayjs from "dayjs";

function DetailRepair() {
  const { id, idCar } = useParams();
  const [types, setTypes] = useState([]);

  function getTypes() {
    repairService
      .getTypesByIdRepair(id)
      .then((response) => {
        setTypes(response.data);
      })
      .catch((error) => {
        console.log(
          "Error al obtener los tipos de reparaciones de la reparación",
          error
        );
      });
  }

  useEffect(() => {
    getTypes();
  }, []);

  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
      <Button
        component={NavLink}
        to={`/RepairList/${idCar}`}
        startIcon={<KeyboardBackspaceIcon />}
        sx={{ position: "relative", left: 10, mt: 2 }}
        variant="outlined"
      >
        Regresar a la lista de reparaciones
      </Button>
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
              <TableCell align="left">Patente</TableCell>
              <TableCell align="center">Tipo de Reparación</TableCell>
              <TableCell align="center">Fecha y Hora</TableCell>
              <TableCell align="center">Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {types.map((type) => (
              <TableRow key={type.id}>
                <TableCell align="left">{type.licensePlate}</TableCell>
                <TableCell align="center">{type.typeRepair}</TableCell>
                <TableCell align="center">
                  {dayjs(type.date).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell align="center">{type.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DetailRepair;
