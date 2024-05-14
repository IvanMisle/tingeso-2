import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import carService from "../services/car.service";

function AddEditCar() {
  const { id } = useParams();
  const [titleForm, setTitleForm] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [typeEngine, setTypeEngine] = useState("");
  const [manufactureYear, setManufactureYear] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [numberSeats, setNumberSeats] = useState("");
  const [mileage, setMileage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setTitleForm("Editar vehiculo");
      carService
        .get(id)
        .then((car) => {
          setBrand(car.data.brand);
          setModel(car.data.model);
          setType(car.data.type);
          setTypeEngine(car.data.typeEngine);
          setManufactureYear(car.data.manufactureYear);
          setLicensePlate(car.data.licensePlate);
          setNumberSeats(car.data.numberSeats);
          setMileage(car.data.mileage);
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar mostrar vehiculo.",
            error
          );
        });
    } else {
      setTitleForm("Añadir un vehiculo nuevo");
    }
  }, []);

  function saveEditCar(e) {
    e.preventDefault();
    const car = {
      brand,
      model,
      type,
      typeEngine,
      manufactureYear,
      licensePlate,
      numberSeats,
      mileage,
      id
    };
    if (id) {
      carService
        .update(car)
        .then((response) => {
          console.log("Vehiculo ha sido actualizado.", response.data);
          navigate("/carList");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar actualizar datos del vehiculo.",
            error
          );
        });
    } else {
      carService
        .create(car)
        .then((response) => {
          console.log("Vehiculo ha sido añadido.", response.data);
          navigate("/carList");
        })
        .catch((error) => {
          console.log(
            "Ha ocurrido un error al intentar crear nuevo vehiculo.",
            error
          );
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
      <Typography variant="h3" color="primary"> {titleForm} </Typography>
      <TextField
        fullWidth
        id="marca"
        label="Marca"
        value={brand}
        sx={{ mt: 2 }}
        variant="filled"
        onChange={(e) => setBrand(e.target.value)}
      />
      <TextField
        fullWidth
        id="modelo"
        label="Modelo"
        value={model}
        sx={{ mt: 2 }}
        variant="filled"
        onChange={(e) => setModel(e.target.value)}
      />
      <FormControl
        fullWidth
        sx={{ mt: 2, textAlign: "left" }}
      >
        <InputLabel id="type">Tipo de vehiculo</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          variant="filled"
        >
          <MenuItem value="Sedán">Sedán</MenuItem>
          <MenuItem value="Hatchback">Hatchback</MenuItem>
          <MenuItem value="SUV">SUV</MenuItem>
          <MenuItem value="Pickup">Pickup</MenuItem>
          <MenuItem value="Furgoneta">Furgoneta</MenuItem>
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        sx={{ mt: 2, textAlign: "left" }}
      >
        <InputLabel id="typeEngine">Tipo de motor</InputLabel>
        <Select
          value={typeEngine}
          onChange={(e) => setTypeEngine(e.target.value)}
          variant="filled"
        >
          <MenuItem value="Gasolina">Gasolina</MenuItem>
          <MenuItem value="Híbrido">Híbrido</MenuItem>
          <MenuItem value="Eléctrico">Eléctrico</MenuItem>
          <MenuItem value="Diésel">Diésel</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="year"
        label="Año de fabricación"
        variant="filled"
        value={manufactureYear}
        sx={{ mt: 2 }}
        onChange={(e) => setManufactureYear(e.target.value)}
      />
      <TextField
        fullWidth
        id="licesnePlate"
        label="Numero de patente"
        variant="filled"
        value={licensePlate}
        sx={{ mt: 2 }}
        onChange={(e) => setLicensePlate(e.target.value)}
      />
      <FormControl
        fullWidth
        sx={{ mt: 2, textAlign: "left" }}
      >
        <InputLabel id="numberSeats">Numero de asientos</InputLabel>
        <Select
          value={numberSeats}
          onChange={(e) => setNumberSeats(e.target.value)}
          variant="filled"
        >
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>
          <MenuItem value="7">7</MenuItem>
          <MenuItem value="8">8</MenuItem>
          <MenuItem value="9">9</MenuItem>
          <MenuItem value="10">10</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="mileage"
        label="Kilometraje"
        variant="filled"
        value={mileage}
        sx={{ mt: 2 }}
        onChange={(e) => setMileage(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={(e) => saveEditCar(e)}
      >
        Guardar
      </Button>
      <Button
        component={NavLink}
        to="/carList"
        sx={{ mt: 2, ml: 5 }}
        variant="outlined"
        color="info"
      >
        Volver a la lista de vehiculos
      </Button>
    </Box>
  );
}

export default AddEditCar;
