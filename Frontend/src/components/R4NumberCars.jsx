import { TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import typeRepairService from "../services/typeRepair.service";

function R4NumberCars({ number, typeCar }) {
  const [data, setData] = useState();

  function init() {
    typeRepairService
      .numberTypeEngineCarsByType(number, typeCar)
      .then((response) => {
        console.log("Number of cars by type of engine has been obtained.", response.data)
        setData(response.data);
      })
      .catch((error) => {
        console.log(
          "An error occurred while trying to get type of repair by id.",
          error
        );
      });
  }

  useEffect(() => {
    init();
  }, []);

  return <TableCell align="center">{data}</TableCell>;
}

export default R4NumberCars;
