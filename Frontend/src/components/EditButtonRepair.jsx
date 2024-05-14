import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import repairService from "../services/repair.service";

function EditButtonRepair({id, id_car}) {
  const [buttonState, setButtonState] = useState(false);

    function init() {
      repairService
        .haveTicket(id)
        .then((response) => {
          setButtonState(response.data);
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

  return (
    <IconButton
      disabled={buttonState}
      component={NavLink}
      to={`/editRepair/${id_car}/${id}`}
    >
      <EditIcon />
    </IconButton>
  );
}

export default EditButtonRepair;