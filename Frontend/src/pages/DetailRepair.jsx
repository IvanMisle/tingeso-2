import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import ticketService from "../services/ticket.service";
import repairService from "../services/repair.service";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
} from "@mui/material";


function DetailRepair() {
  const { id, id_car } = useParams();
  const [ticket, setTicket] = useState([]);
  const [haveTicket, setHaveTicket] = useState(false);

  function saveTicket(e) {
    e.preventDefault();
    ticketService
      .save(ticket)
      .then((response) => {
        console.log("Ticket ha sido guardado.", response.data);
      })
      .catch((error) => {
        console.log("Error al guardar el ticket", error);
      });
      window.location.reload();
  }

  async function init() {
    try {
      const response = await ticketService.createTicket(id);
      setTicket(response.data);
    } catch (error) {
      console.log("Error al obtener el ticket", error);
    }
    try {
        const response = await repairService.haveTicket(id);
        if(response.data){
            setHaveTicket(true);
        } else {
            setHaveTicket(false);
        }
        console.log(response.data)
    } catch (error) {
        console.log("Error al obtener el ticket", error);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
      <Button
        component={NavLink}
        to={`/RepairList/${id_car}`}
        startIcon={<KeyboardBackspaceIcon />}
        sx={{ position: "absolute", left: 10, mt: 2 }}
        variant="outlined"
      >
        Regresar
      </Button>
      <Button
        sx={{ mt: 2, mb: 2 }}
        variant="outlined"
        onClick={(e) => saveTicket(e)}
        disabled={haveTicket}
      >
        Aceptar reparación
      </Button>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="a dense table"
          size="small"
        >
          <TableBody>
            <TableRow>
              <TableCell align="center">Fecha y hora</TableCell>
              <TableCell align="center">
                {dayjs(ticket.date).format("YYYY-MM-DD HH:mm:ss")}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                Descuento por numero de reparaciones
              </TableCell>
              <TableCell align="center">
                {ticket.discountNumberRepairs * 100}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                Descuento por día de atención
              </TableCell>
              <TableCell align="center">
                {ticket.discountDayAttention * 100}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Recargo por kilometraje</TableCell>
              <TableCell align="center">{ticket.feeMileage * 100}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Recargo por antiguedad</TableCell>
              <TableCell align="center">{ticket.feeLongevity * 100}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                Recargo por retraso en la recogida del vehiculo
              </TableCell>
              <TableCell align="center">{ticket.feeLate * 100}%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Descuento por bono</TableCell>
              <TableCell align="center">${ticket.discountBonus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Precio final</TableCell>
              <TableCell align="center">${ticket.finalPrice}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default DetailRepair;
