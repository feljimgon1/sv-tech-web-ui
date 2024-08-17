import { useState, useEffect } from 'react'
import {
  DataSheetGrid,
  textColumn,
  keyColumn,
} from 'react-datasheet-grid'
import { useDispatch } from 'react-redux'
import 'react-datasheet-grid/dist/style.css'
import './balance.scss'

const Balance = () => {
  // Define states for each value
  const [inmovilizadoInmaterial, setInmovilizadoInmaterial] = useState(0)
  const [inmovilizadoMaterial, setInmovilizadoMaterial] = useState(0)
  const [otrosActivosFijos, setOtrosActivosFijos] = useState(0)
  const [existencias, setExistencias] = useState(0)
  const [deudores, setDeudores] = useState(0)
  const [otrosActivosLiquidos, setOtrosActivosLiquidos] = useState(0)
  const [fondosPropios, setFondosPropios] = useState(0)
  const [capitalSuscrito, setCapitalSuscrito] = useState(0)
  const [otrosFondosPropios, setOtrosFondosPropios] = useState(0)
  const [pasivoFijo, setPasivoFijo] = useState(0)
  const [acreedorALP, setAcreedorALP] = useState(0)
  const [otrosPasivosFijos, setOtrosPasivosFijos] = useState(0)
  const [provisiones, setProvisiones] = useState(0)
  const [pasivoLiquido, setPasivoLiquido] = useState(0)
  const [deudasFinancieras, setDeudasFinancieras] = useState(0)
  const [acreedorComerciales, setAcreedorComerciales] = useState(0)
  const [otrosPasivosLiquidos, setOtrosPasivosLiquidos] = useState(0)

  // Define states for the calculated values
  const [inmovilizado, setInmovilizado] = useState(0)
  const [activoCirculante, setActivoCirculante] = useState(0)
  const [totalActivo, setTotalActivo] = useState(0)
  const [totalPasivoYCapitalPropio, setTotalPasivoYCapitalPropio] = useState(0)

  const [data, setData] = useState([])

  useEffect(() => {
    // Ensure all values are numeric
    const inmovilizadoInmaterialNum = parseFloat(inmovilizadoInmaterial) || 0;
    const inmovilizadoMaterialNum = parseFloat(inmovilizadoMaterial) || 0;
    const otrosActivosFijosNum = parseFloat(otrosActivosFijos) || 0;
    const existenciasNum = parseFloat(existencias) || 0;
    const deudoresNum = parseFloat(deudores) || 0;
    const capitalSuscritoNum = parseFloat(capitalSuscrito) || 0;
    const otrosFondosPropiosNum = parseFloat(otrosFondosPropios) || 0;
    const deudaNuevaNum = parseFloat(acreedorALP) || 0;
    const otrosPasivosFijosNum = parseFloat(otrosPasivosFijos) || 0;
    const provisionesNum = parseFloat(provisiones) || 0;
    const otrosActivosLiquidosNum = parseFloat(otrosActivosLiquidos) || 0;
    const fondosPropiosNum = parseFloat(fondosPropios) || 0;
    const deudaFinancieraNum = parseFloat(deudasFinancieras) || 0;
    const acreedorComercialesNum = parseFloat(acreedorComerciales) || 0;
    const otrosPasivosLiquidosNum = parseFloat(otrosPasivosLiquidos) || 0;
    const pasivoFijoNum = parseFloat(pasivoFijo) || 0;
    const pasivoLiquidoNum = parseFloat(pasivoLiquido) || 0;

    // Perform calculations
    const newInmovilizado = inmovilizadoInmaterialNum + inmovilizadoMaterialNum + otrosActivosFijosNum;
    const newActivoCirculante = existenciasNum + deudoresNum + otrosActivosLiquidosNum;
    const newFondosPropios = capitalSuscritoNum + otrosFondosPropiosNum;
    const newPasivoFijoNum = deudaNuevaNum + otrosPasivosFijosNum + provisionesNum;
    const newPasivoLiquidoNum = deudaFinancieraNum + acreedorComercialesNum + otrosPasivosLiquidosNum;
    const newTotalActivo = newInmovilizado + newActivoCirculante;
    const newTotalPasivoYCapitalPropio = fondosPropiosNum + pasivoFijoNum + pasivoLiquidoNum;

    // Set calculated states
    setInmovilizado(newInmovilizado);
    setActivoCirculante(newActivoCirculante);
    setFondosPropios(newFondosPropios);
    setPasivoFijo(newPasivoFijoNum);
    setPasivoLiquido(newPasivoLiquidoNum);
    setTotalActivo(newTotalActivo);
    setTotalPasivoYCapitalPropio(newTotalPasivoYCapitalPropio);

    // Update the grid data
    setData([
      { concept: 'Inmovilizado', value: newInmovilizado.toString() },
      { concept: 'Inmovilizado inmaterial', value: inmovilizadoInmaterialNum.toString() },
      { concept: 'Inmovilizado material', value: inmovilizadoMaterialNum.toString() },
      { concept: 'Otros activos fijos', value: otrosActivosFijosNum.toString() },
      { concept: 'Activo circulante', value: newActivoCirculante.toString() },
      { concept: 'Existencias', value: existenciasNum.toString() },
      { concept: 'Deudores', value: deudoresNum.toString() },
      { concept: 'Otros activos líquidos', value: otrosActivosLiquidosNum.toString() },
      { concept: 'Total activo', value: newTotalActivo.toString() },
      { concept: 'Fondos propios', value: newFondosPropios.toString() },
      { concept: 'Capital suscrito', value: capitalSuscrito.toString() },
      { concept: 'Otros fondos propios', value: otrosFondosPropios.toString() },
      { concept: 'Pasivo fijo', value: newPasivoFijoNum.toString() },
      { concept: 'Acreedores a L.P.', value: acreedorALP.toString() },
      { concept: 'Otros pasivos fijos', value: otrosPasivosFijos.toString() },
      { concept: 'Provisiones', value: provisiones.toString() },
      { concept: 'Pasivo líquido', value: newPasivoLiquidoNum.toString() },
      { concept: 'Deudas financieras', value: deudasFinancieras.toString() },
      { concept: 'Acreedores comerciales', value: acreedorComerciales.toString() },
      { concept: 'Otros pasivos líquidos', value: otrosPasivosLiquidos.toString() },
      { concept: 'Total pasivo y capital propio', value: newTotalPasivoYCapitalPropio.toString() },
    ])
  }, [
    inmovilizadoInmaterial,
    inmovilizadoMaterial,
    otrosActivosFijos,
    existencias,
    deudores,
    otrosActivosLiquidos,
    acreedorALP,
    provisiones,
    otrosPasivosFijos,
    deudasFinancieras,
    acreedorComerciales,
    otrosPasivosLiquidos,
    fondosPropios,
    capitalSuscrito,
    otrosFondosPropios,
    pasivoFijo,
    pasivoLiquido
  ]);

  // Update states based on grid data changes
  const handleDataChange = (updatedData) => {
    setData(updatedData);
    updatedData.forEach((row) => {
      switch (row.concept) {
        case 'Inmovilizado inmaterial':
          setInmovilizadoInmaterial(parseFloat(row.value) || 0);
          break;
        case 'Inmovilizado material':
          setInmovilizadoMaterial(parseFloat(row.value) || 0);
          break;
        case 'Otros activos fijos':
          setOtrosActivosFijos(parseFloat(row.value) || 0);
          break;
        case 'Existencias':
          setExistencias(parseFloat(row.value) || 0);
          break;
        case 'Deudores':
          setDeudores(parseFloat(row.value) || 0);
          break;
        case 'Otros activos líquidos':
          setOtrosActivosLiquidos(parseFloat(row.value) || 0);
          break;
        case 'Fondos propios':
          setFondosPropios(parseFloat(row.value) || 0);
          break;
        case 'Capital suscrito':
          setCapitalSuscrito(parseFloat(row.value) || 0);
          break;
        case 'Otros fondos propios':
          setOtrosFondosPropios(parseFloat(row.value) || 0);
          break;
        case 'Pasivo fijo':
          setPasivoFijo(parseFloat(row.value) || 0);
          break;
        case 'Acreedores a L.P.':
          setAcreedorALP(parseFloat(row.value) || 0);
          break;
        case 'Otros pasivos fijos':
          setOtrosPasivosFijos(parseFloat(row.value) || 0);
          break;
        case 'Provisiones':
          setProvisiones(parseFloat(row.value) || 0);
          break;
        case 'Pasivo líquido':
          setPasivoLiquido(parseFloat(row.value) || 0);
          break;
        case 'Deudas financieras':
          setDeudasFinancieras(parseFloat(row.value) || 0);
          break;
        case 'Acreedores comerciales':
          setAcreedorComerciales(parseFloat(row.value) || 0);
          break;
        case 'Otros pasivos líquidos':
          setOtrosPasivosLiquidos(parseFloat(row.value) || 0);
          break;
        default:
          break;
      }
    });
    fetch(`${import.meta.env.VITE_SV_TECH_API}/users/balance`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        setBalance(data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  // Define the columns
  const columns = [
    { ...keyColumn('concept', textColumn), title: 'Concepto', grow: 2, disabled: true },
    {
      ...keyColumn('value', textColumn), title: 'Valor', disabled: ({ rowIndex }) => {
        return (
          rowIndex === 0 || rowIndex === 4 || rowIndex === 8 || rowIndex === 9 ||
          rowIndex === 12 || rowIndex === 16 || rowIndex === 20
        )
      }
    },
  ]

  return (
    <div className="data-grid-wrapper" style={{
      maxWidth: '100%',
      margin: '0auto',
      height: '80vh',
    }}>
      <DataSheetGrid
        rowClassName={({ rowIndex }) => {
          if (
            rowIndex === 0 || rowIndex === 4 || rowIndex === 8 || rowIndex === 9 ||
            rowIndex === 12 || rowIndex === 16 || rowIndex === 20
          ) {
            return 'bold'
          }
        }}
        addRowsComponent={false}
        value={data}
        onChange={handleDataChange}
        columns={columns}
        height={600}
      />
    </div>
  )
}

export default Balance