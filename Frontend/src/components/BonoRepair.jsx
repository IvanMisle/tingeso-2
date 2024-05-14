import { useEffect, useState } from "react";
import bonusService from "../services/bonus.service";
import { Box } from "@mui/material";

function BonoRepair({ id }) {
  const [bonus, setBonus] = useState(null);

  function init() {
    if (id === null) {
        setBonus(0);
        return
    }
    bonusService
      .getBonusById(id)
      .then((response) => {
        if (response.data.bonus !== null) {
          setBonus(response.data.bonus);
        }
      })
      .catch((error) => {
        console.log(
          "An error occurred while trying to get bonus by id.",
          error
        );
      });
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Box>
        {bonus}
    </Box>
  );
}

export default BonoRepair;
