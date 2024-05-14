import { useState, useEffect } from 'react';
import { List, ListItemText, Box, ListItem } from '@mui/material';
import typeRepairService from '../services/typeRepair.service';

function Types ({id}) {
    const [types, setTypes] = useState([]);

    function init() {
        typeRepairService
          .getByIdRepair(id)
          .then((response) => {
            setTypes(response.data);
          })
          .catch((error) => {
            console.log("Error en Types", error);
          });
    }

     useEffect(() => {
        init();
    }, []);

    return (
        <List>
            {types.map((type) => (
                <ListItem key={type.id}>
                    <ListItemText primary={type.name} />
                </ListItem>
            ))}
        </List>
    );
}

export default Types;