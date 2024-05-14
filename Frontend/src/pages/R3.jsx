import repairService from "../services/repair.service";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function R3() {
  const [data, setData] = useState();
  const [ready, setReady] = useState(false);
  
  async function init() {
    try {
      const response = await repairService.getR3();
      setData(response.data);
    }
    catch (error) {
      console.log("Error al obtener R3.", error);
    }
    setReady(true);
    }

  useEffect(() => {
    init();
  }, []);

  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
      <h1>Reporte 3</h1>
      <p>
        Listado con los tiempos promedio de reparación por cada una de las
        marcas de vehículos (ordenado por tiempos de menor a mayor)
      </p>
      {ready ? (
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
                <TableCell align="center">Marca</TableCell>
                <TableCell align="center">
                  Tiempo promedio en reparaciones (en horas)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{item[0]}</TableCell>
                  <TableCell align="center">{item[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h1>Cargando...</h1>
      )}
    </Box>
  );
}

export default R3;
