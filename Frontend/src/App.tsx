import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import CarList from "./pages/CarList";
import AddEditCar from "./pages/AddEditCar";
import RepairList from "./pages/RepairList";
import AddEditRepair from "./pages/AddEditRepair";
import DetailRepair from "./pages/DetailRepair";
import Report from "./pages/Report";
import R1 from "./pages/R1";
import R2 from "./pages/R2";

const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/carList",
    component: <CarList />,
  },
  {
    path: "*",
    component: <h1>Not Found</h1>,
  },
  {
    path: "/editCar/:id",
    component: <AddEditCar />,
  },
  {
    path: "/RepairList/:id",
    component: <RepairList />,
  },
  {
    path: "/addCar",
    component: <AddEditCar />,
  },
  {
    path: "/addRepair/:id_Car",
    component: <AddEditRepair />,
  },
  {
    path: "/editRepair/:id_Car/:id",
    component: <AddEditRepair />,
  },
  {
    path: "/DetailRepair/:id/:idCar",
    component: <DetailRepair />,
  },
  {
    path: "/Report",
    component: <Report />,
  },
  {
    path: "/R1",
    component: <R1 />,
  },
  {
    path: "/R2",
    component: <R2 />,
  }
];

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;