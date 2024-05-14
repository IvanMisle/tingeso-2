import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Switch,
} from "@mui/material";
import repairService from "../services/repair.service";
import typeRepairService from "../services/typeRepair.service";
import typeRepairRepairService from "../services/typeRepairRepair.service";
import bonusService from "../services/bonus.service";
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateTimePicker,
} from "@mui/x-date-pickers/DateTimePicker";
import carService from "../services/car.service";

function AddEditRepair() {
  const { id_Car, id } = useParams();
  const [titleForm, setTitleForm] = useState("");
  const [dateTimeEntry, setDateTimeEntry] = useState(dayjs(null));
  const [dateTimeExit, setDateTimeExit] = useState(dayjs(null));
  const [dateTimePickUp, setDateTimePickUp] = useState(dayjs(null));
  const [typesRepairs, setTypesRepairs] = useState([]);
  const [typesRepairsList, setTypesRepairsList] = useState([]);
  const navigate = useNavigate();
  const [buttonBonus, setButtonBonus] = useState(false);
  const [bonus, setBonus] = useState([]);
  const [isBonusLoaded, setIsBonusLoaded] = useState(false);

  async function AddEditTypes(id) {
    typeRepairRepairService
      .updateTypesByIdRepair(id, typesRepairs)
      .then((response) => {
        console.log(
          "Tipos de reparación han sido actualizados.",
          response.data
        );
      })
      .catch((error) => {
        console.log("Error al actualizar tipos de reparación", error);
      });
  }

  function getTypesRepairs() {
    typeRepairService
      .getAll()
      .then((response) => {
        setTypesRepairsList(response.data);
      })
      .catch((error) => {
        console.log("Error en la función getTypesRepairs", error);
      });
  }

  function getTypesRepairsByIdRepair() {
    typeRepairService
      .getNumbersByIdRepair(id)
      .then((response) => {
        setTypesRepairs(response.data);
      })
      .catch((error) => {
        console.log("Error en la función getTypesRepairs", error);
      });
  }

  async function getBrand() {
    try {
      const response = await carService.get(id_Car);
      return response.data.brand;
    } catch (error) {
      console.log("Error en la función getBrand", error);
    }
  }

  async function getBonus() {
    try {
      const brand = await getBrand();
      const response = await bonusService.getBonus2(id, brand);
      setBonus(response.data);
    } catch (error) {
      console.log("Error en la función getBonus", error);
    }
  }

  useEffect(() => {
    getTypesRepairs();
    if (id) {
      setTitleForm("Editar reparación");
      repairService
        .get(id)
        .then((repair) => {
          setDateTimeEntry(dayjs(repair.data.dateTimeEntry));
          setDateTimeExit(dayjs(repair.data.dateTimeExit));
          setDateTimePickUp(dayjs(repair.data.dateTimePickUp));
          if (repair.data.id_bonus !== null) {
            setButtonBonus(true);
          }
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar mostrar reparación.",
            error
          );
        });
      getTypesRepairsByIdRepair();
      getBonus().then(() => setIsBonusLoaded(true));
    } else {
      setTitleForm("Añadir una reparación nueva");
    }
  }, []);

  async function getBonusId() {
    try {
      const brand = await getBrand();
      const response = await bonusService.getBonusId(brand);
      return response.data;
    } catch (error) {
      console.log("Error en la función getBonusId", error);
    }
  }

  async function saveEditRepair(e) {
    e.preventDefault();
    const exit = dateTimeExit.format("YYYY-MM-DDTHH:mm:ss");
    const entry = dateTimeEntry.format("YYYY-MM-DDTHH:mm:ss");
    const pickUp = dateTimePickUp.format("YYYY-MM-DDTHH:mm:ss");
    let id_bonus = null;
    if (buttonBonus) {
      id_bonus = await getBonusId();
    }
    const repair = {
      id,
      dateTimeEntry: entry,
      dateTimeExit: exit,
      dateTimePickUp: pickUp,
      id_Car,
      id_bonus,
    };
    if (id) {
      repairService
        .update(repair)
        .then((response) => {
          console.log("Reparación ha sido actualizada.", response.data);
          AddEditTypes(response.data.id);
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
          console.log(typesRepairs);
          AddEditTypes(response.data.id);
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
      <FormControl
        fullWidth
        sx={{ mt: 2, textAlign: "left" }}
      >
        <InputLabel id="type">Tipos de reparación</InputLabel>
        <Select
          value={typesRepairs}
          onChange={(e) => setTypesRepairs(e.target.value)}
          variant="filled"
          multiple
        >
          {typesRepairsList.map((typeRepair) => (
            <MenuItem
              key={typeRepair.id}
              value={typeRepair.number}
            >
              {typeRepair.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {isBonusLoaded && (
        <FormControl
          style={{ width: "100%" }}
          sx={{ mt: 2 }}
        >
          <label>
            {buttonBonus ? "Quitar bono" : "Agregar bono"} de ${bonus}
            <Switch
              disabled={bonus === 0}
              checked={buttonBonus}
              inputProps={{ "aria-label": "activar/desactivar" }}
              onChange={(e) => setButtonBonus(e.target.checked)}
            />
          </label>
        </FormControl>
      )}
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={(e) => saveEditRepair(e)}
      >
        Guardar reparacion AUTOFIX
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
