import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function R2() {
  return (
    <Box style={{ textAlign: "center", margin: "auto", width: 1300 }}>
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
              <TableCell align="left">MES</TableCell>
              <TableCell align="center">Sedan</TableCell>
              <TableCell align="center">% Variacion</TableCell>
              <TableCell align="center">SUV</TableCell>
              <TableCell align="center">% Variacion</TableCell>
              <TableCell align="center">Furgoneta</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default R2;
