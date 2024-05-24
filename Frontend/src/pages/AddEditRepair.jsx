import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Switch,
} from "@mui/material";
import repairService from "../services/repair.service";
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import carService from "../services/car.service";

function AddEditRepair() {
  const { id_Car, id } = useParams();
  const navigate = useNavigate();
  const [titleForm, setTitleForm] = useState("");
  const [dateTimeEntry, setDateTimeEntry] = useState(dayjs(null));
  const [dateTimeExit, setDateTimeExit] = useState(dayjs(null));
  const [dateTimePickUp, setDateTimePickUp] = useState(dayjs(null));

  useEffect(() => {
    if (id) {
      setTitleForm("Editar reparación");
      repairService
        .get(id)
        .then((repair) => {
          setDateTimeEntry(dayjs(repair.data.dateTimeEntry));
          setDateTimeExit(dayjs(repair.data.dateTimeExit));
          setDateTimePickUp(dayjs(repair.data.dateTimePickUp));
        })
        .catch((error) => {
          console.log("Error al obtener la reparación", error);
        });
    } else {
      setTitleForm("Añadir una nueva reparación");
    }
  }, []);

  async function saveEditRepair(e) {
    e.preventDefault();
    const entry = dateTimeEntry.format("YYYY-MM-DDTHH:mm:ss");
    const exit = dateTimeExit.format("YYYY-MM-DDTHH:mm:ss");
    const pickUp = dateTimePickUp.format("YYYY-MM-DDTHH:mm:ss");
    const repair = {
      id,
      dateTimeEntry: entry,
      dateTimeExit: exit,
      dateTimePickUp: pickUp,
      idCar: id_Car,
    };
    if (id) {
      repairService
        .update(repair)
        .then((response) => {
          console.log("Reparación ha sido actualizada.", response.data);
          navigate(`/repairList/${id_Car}`);
        })
        .catch((error) => {
          console.log("Error al actualizar reparación", error);
        });
    } else {
      repairService
        .create(repair)
        .then((response) => {
          console.log("Reparación ha sido creada.", response.data);
          navigate(`/repairList/${id_Car}`);
        })
        .catch((error) => {
          console.log("Error al crear reparación", error);
        });
    }
  }

  return (
    <Box
      component="form"
      sx={{
        textAlign: "center",
        width: 1000,
        margin: "auto",
      }}
    >
      <Typography
        variant="h3"
        color="primary"
      >
        {titleForm}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateTimePicker"]}>
          <DateTimePicker
            label="Fecha y hora de ingreso"
            value={dateTimeEntry}
            onChange={(e) => setDateTimeEntry(e)}
          />
          <DateTimePicker
            label="Fecha y hora del termino de las reparaciones"
            value={dateTimeExit}
            onChange={(e) => setDateTimeExit(e)}
          />
          <DateTimePicker
            label="Fecha y hora del retiro del vehiculo"
            value={dateTimePickUp}
            onChange={(e) => setDateTimePickUp(e)}
          />
        </DemoContainer>
      </LocalizationProvider>
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={(e) => saveEditRepair(e)}
      >
        Guardar reparación
      </Button>
      <Button
        component={NavLink}
        to={`/repairList/${id_Car}`}
        sx={{ mt: 2, ml: 5 }}
        variant="outlined"
        color="info"
      >
        Volver a la lista de reparaciones
      </Button>
    </Box>
  );
}

export default AddEditRepair;
