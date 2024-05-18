INSERT INTO discount_number_repairs (min_number_repairs, max_number_repairs, type_engine, discount) VALUES
(0, 0, 'Gasolina', 0),
(0, 0, 'Diésel', 0),
(0, 0, 'Híbrido', 0), 
(0, 0, 'Eléctrico', 0),
('1', '2', 'Gasolina', '0.05'),
('3', '5', 'Gasolina', '0.1'),
('6', '9', 'Gasolina', '0.15'),
('10', '10000', 'Gasolina', '0.2'),
('1', '2', 'Diésel', '0.07'),
('3', '5', 'Diésel', '0.12'),
('6', '9', 'Diésel', '0.17'),
('10', '10000', 'Diésel', '0.22'),
('1', '2', 'Híbrido', '0.1'),
('3', '5', 'Híbrido', '0.15'),
('6', '9', 'Híbrido', '0.2'),
('10', '10000', 'Híbrido', '0.25'),
('1', '2', 'Eléctrico', '0.08'),
('3', '5', 'Eléctrico', '0.13'),
('6', '9', 'Eléctrico', '0.18'),	
('10', '10000', 'Eléctrico', '0.23');

INSERT INTO fee_longevity (min_year, max_year, type_car, fee) VALUES
('0', '5', 'Sedán', 0),
('6', '10', 'Sedán', 0.05),
('11', '15', 'Sedán', 0.09),
('16', '10000', 'Sedán', 0.15),
('0', '5', 'Hatchback', 0),
('6', '10', 'Hatchback', 0.05),
('11', '15', 'Hatchback', 0.09),
('16', '10000', 'Hatchback', 0.15),
('0', '5', 'SUV', 0),
('6', '10', 'SUV', 0.07),
('11', '15', 'SUV', 0.11),
('16', '10000', 'SUV', 0.2),
('0', '5', 'Pickup', 0),
('6', '10', 'Pickup', 0.07),
('11', '15', 'Pickup', 0.11),
('16', '10000', 'Pickup', 0.2),
('0', '5', 'Furgoneta', 0),
('6', '10', 'Furgoneta', 0.07),
('11', '15', 'Furgoneta', 0.11),
('16', '10000', 'Furgoneta', 0.2);

INSERT INTO repair_cost (type_repair, type_engine, cost) VALUES 
('1', 'Gasolina', 120000), 
('2', 'Gasolina', 130000),
('3', 'Gasolina', 350000), 
('4', 'Gasolina', 210000), 
('5', 'Gasolina', 150000), 
('6', 'Gasolina', 100000), 
('7', 'Gasolina', 100000), 
('8', 'Gasolina', 180000), 
('9', 'Gasolina', 150000), 
('10', 'Gasolina', 130000), 
('11', 'Gasolina', 80000), 
('1', 'Diésel', 120000), 
('2', 'Diésel', 130000),
('3', 'Diésel', 450000), 
('4', 'Diésel', 210000), 
('5', 'Diésel', 150000), 
('6', 'Diésel', 120000), 
('7', 'Diésel', 100000), 
('8', 'Diésel', 180000), 
('9', 'Diésel', 150000), 
('10', 'Diésel', 140000), 
('11', 'Diésel', 80000),
('1', 'Híbrido', 180000), 
('2', 'Híbrido', 190000),
('3', 'Híbrido', 700000), 
('4', 'Híbrido', 300000), 
('5', 'Híbrido', 200000), 
('6', 'Híbrido', 450000), 
('7', 'Híbrido', 100000), 
('8', 'Híbrido', 210000), 
('9', 'Híbrido', 180000), 
('10', 'Híbrido', 220000), 
('11', 'Híbrido', 80000), 
('1', 'Eléctrico', 220000), 
('2', 'Eléctrico', 230000),
('3', 'Eléctrico', 800000), 
('4', 'Eléctrico', 300000), 
('5', 'Eléctrico', 250000), 
('6', 'Eléctrico', 0), 
('7', 'Eléctrico', 100000), 
('8', 'Eléctrico', 250000), 
('9', 'Eléctrico', 180000), 
('10', 'Eléctrico', 0), 
('11', 'Eléctrico', 80000);

INSERT INTO fee_mileage (min_mileage, max_mileage, type_car, fee) VALUES
('0', '5000', 'Sédan', 0),
('5001', '12000', 'Sédan', 0.03),
('12001', '25000', 'Sédan', 0.07),
('25001', '40000', 'Sédan', 0.12),
('40001', '100000000', 'Sédan', 0.2),
('0', '5000', 'Hatchback', 0),
('5001', '12000', 'Hatchback', 0.03),
('12001', '25000', 'Hatchback', 0.07),
('25001', '40000', 'Hatchback', 0.12),
('40001', '100000000', 'Hatchback', 0.2),
('0', '5000', 'SUV', 0),
('5001', '12000', 'SUV', 0.05),
('12001', '25000', 'SUV', 0.09),
('25001', '40000', 'SUV', 0.12),
('40001', '100000000', 'SUV', 0.2),
('0', '5000', 'Pickup', 0),
('5001', '12000', 'Pickup', 0.05),
('12001', '25000', 'Pickup', 0.09),
('25001', '40000', 'Pickup', 0.12),
('40001', '100000000', 'Pickup', 0.2),
('0', '5000', 'Furgoneta', 0),
('5001', '12000', 'Furgoneta', 0.05),
('12001', '25000', 'Furgoneta', 0.09),
('25001', '40000', 'Furgoneta', 0.12),
('40001', '100000000', 'Furgoneta', 0.2);

INSERT INTO type_repair(number, name, description) VALUES
('1', 'Reparaciones del Sistema de Frenos', 'Incluye el reemplazo de pastillas de freno, discos,
tambores, líneas de freno y reparación o reemplazo del cilindro maestro de frenos.'),
('2', 'Servicio del Sistema de Refrigeración' ,'Reparación o reemplazo de radiadores, bombas
de agua, termostatos y mangueras, así como la solución de problemas de
sobrecalentamiento.'),
('3', 'Reparaciones del Motor', 'Desde reparaciones menores como el reemplazo de bujías y
cables, hasta reparaciones mayores como la reconstrucción del motor o la reparación
de la junta de la culata.'),
('4', 'Reparaciones de la Transmisión', 'Incluyen la reparación o reemplazo de componentes
de la transmisión manual o automática, cambios de líquido y solución de problemas
de cambios de marcha.'),
('5', 'Reparación del Sistema Eléctrico', 'Solución de problemas y reparación de alternadores,
arrancadores, baterías y sistemas de cableado, así como la reparación de componentes
eléctricos como faros, intermitentes y sistemas de entretenimiento.'),
('6', 'Reparaciones del Sistema de Escape', 'Incluye el reemplazo del silenciador, tubos de
escape, catalizador y la solución de problemas relacionados con las emisiones.'),
('7', 'Reparación de Neumáticos y Ruedas', 'Reparación de pinchazos, reemplazo de
neumáticos, alineación y balanceo de ruedas.'),
('8', 'Reparaciones de la Suspensión y la Dirección', 'Reemplazo de amortiguadores, brazos
de control, rótulas y reparación del sistema de dirección asistida.'),
('9', 'Reparación del Sistema de Aire Acondicionado y Calefacción', 'Incluye la recarga de
refrigerante, reparación o reemplazo del compresor, y solución de problemas del
sistema de calefacción.'),
('10', 'Reparaciones del Sistema de Combustible', 'Limpieza o reemplazo de inyectores de
combustible, reparación o reemplazo de la bomba de combustible y solución de
problemas de suministro de combustible.'),
('11', 'Reparación y Reemplazo del Parabrisas y Cristales', 'Reparación de pequeñas grietas
en el parabrisas o reemplazo completo de parabrisas y ventanas dañadas.
');
