import { TableCell } from '@mui/material';
import { useEffect, useState } from 'react';
import typeRepairService from '../services/typeRepair.service';

function R2NumberCars ({number, typeCar}) {
    const [data, setData] = useState();

    function init() {
        typeRepairService
          .numberTypeCarsByType(number, typeCar)
          .then((response) => {
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

    return (
      <TableCell align="center">
        {data}
      </TableCell>
    );
}

export default R2NumberCars;