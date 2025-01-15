import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Rows = {
  id: string;
  ref: string;
  type: string;
  combustivel: string;
  unidade: string;
  CO2: string;
  CH4: string;
  N2O: string;
};

function Combustaoestacionaria2() {
  const { register } = useForm();
  const [rows, setRows] = useState<Rows[]>([]);
  const [consumoCombustivel, setConsumoCombustivel] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/getCombEstTab2');
      const ans = await data.json();
      setRows(ans);
    };
    fetchData();
  }, []);

  const handleInputChange = (id: string, value: string) => {
    setConsumoCombustivel((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const filteredRowsFosseis = rows.filter((row) => row.type === 'fosseis');
  const filteredRowsBiomassa = rows.filter((row) => row.type === 'biomassa');

  const calculateTotals = (filteredRows: Rows[]) => {
    const totalCO2 = filteredRows.reduce((sum, row) => {
      const consumo = parseFloat(consumoCombustivel[row.id] || '0');
      return sum + parseFloat(row.CO2) * consumo;
    }, 0);

    const totalCH4 = filteredRows.reduce((sum, row) => {
      const consumo = parseFloat(consumoCombustivel[row.id] || '0');
      return sum + parseFloat(row.CH4) * consumo;
    }, 0);

    const totalN2O = filteredRows.reduce((sum, row) => {
      const consumo = parseFloat(consumoCombustivel[row.id] || '0');
      return sum + parseFloat(row.N2O) * consumo;
    }, 0);

    return {
      totalCO2,
      totalCH4,
      totalN2O,
      totalCO2e: totalCO2 + totalCH4 + totalN2O,
    };
  };

  const totalsFosseis = calculateTotals(filteredRowsFosseis);
  const totalsBiomassa = calculateTotals(filteredRowsBiomassa);

  const renderRows = (filteredRows: Rows[], groupName: string) => (
    <React.Fragment>
      {filteredRows.map((row) => {
        const consumo = parseFloat(consumoCombustivel[row.id] || '0');
        const emissoesCO2 = parseFloat(row.CO2) * consumo || 0;
        const emissoesCH4 = parseFloat(row.CH4) * consumo || 0;
        const emissoesN2O = parseFloat(row.N2O) * consumo || 0;
        const emissoesTotais = emissoesCO2 + emissoesCH4 + emissoesN2O;
        return (
          <TableRow key={row.id}>
            <TableCell>{row.ref}</TableCell>
            <TableCell>{row.combustivel}</TableCell>
            <TableCell>
              <input
                type="text"
                {...register(`combustivel-${row.id}`)}
                value={consumoCombustivel[row.id] || ''}
                onChange={(e) => handleInputChange(row.id, e.target.value)}
              />
            </TableCell>
            <TableCell>{row.unidade}</TableCell>
            <TableCell>{row.CO2}</TableCell>
            <TableCell>{row.CH4}</TableCell>
            <TableCell>{row.N2O}</TableCell>
            <TableCell>{emissoesCO2.toFixed(3)}</TableCell>
            <TableCell>{emissoesCH4.toFixed(3)}</TableCell>
            <TableCell>{emissoesN2O.toFixed(3)}</TableCell>
            <TableCell>{emissoesTotais.toFixed(3)}</TableCell>
          </TableRow>
        );
      })}
      <TableRow>
        <TableCell> </TableCell>
        <TableCell> </TableCell>
        <TableCell> </TableCell>
        <TableCell> </TableCell>
        <TableCell className="bg-green-400 font-bold">Totais</TableCell>
        <TableCell className="bg-green-400 font-bold">combustíveis</TableCell>
        <TableCell className="bg-green-400 font-bold">{groupName}</TableCell>
        <TableCell className="bg-green-400">{calculateTotals(filteredRows).totalCO2.toFixed(3)}</TableCell>
        <TableCell className="bg-green-400">{calculateTotals(filteredRows).totalCH4.toFixed(3)}</TableCell>
        <TableCell className="bg-green-400">{calculateTotals(filteredRows).totalN2O.toFixed(3)}</TableCell>
        <TableCell className="bg-green-400">{calculateTotals(filteredRows).totalCO2e.toFixed(3)}</TableCell>
      </TableRow>
    </React.Fragment>
  );

  return (
    <div>
      <Table aria-label="combustaoestacionaria2">
        <TableHeader>
          <TableColumn>N° Ref</TableColumn>
          <TableColumn>Combustível</TableColumn>
          <TableColumn>Consumo de combustível</TableColumn>
          <TableColumn>Unidade</TableColumn>
          <TableColumn>CO2 (kg/un)</TableColumn>
          <TableColumn>CH4 (kg/un)</TableColumn>
          <TableColumn>N2O (kg/un)</TableColumn>
          <TableColumn>Emissões de CO2 (kg)</TableColumn>
          <TableColumn>Emissões de CH4 (kg)</TableColumn>
          <TableColumn>Emissões de N2O (kg)</TableColumn>
          <TableColumn>Emissões totais (kg CO2e)</TableColumn>
        </TableHeader>
        <TableBody>
          {renderRows(filteredRowsFosseis, 'fósseis')}
          {renderRows(filteredRowsBiomassa, 'biomassa')}
        </TableBody>
      </Table>
      <div>
        <div className='bg-blue-400'>
          <h1 className='text-lg font-bold'>Emissões totais em CO2 equivalente (toneladas) {(totalsFosseis.totalCO2e).toFixed(3)}</h1>
        </div>
        <div className='bg-green-400'>
          <h1 className='text-lg font-bold'>Emissões totais em CO2 equivalente (toneladas) {(totalsBiomassa.totalCO2e).toFixed(3)}</h1>
        </div>
      </div>
    </div>
  );
}

export default Combustaoestacionaria2;
