import { CsvBuilder } from 'filefy';

export default function handleExportCsv(columns, renderData, fileName) {
  const csvColumns = columns.filter((columnDef) => {
    return !columnDef.hidden && columnDef.field && columnDef.export !== false;
  });
  const data = renderData.map((rowData) => csvColumns.map((columnDef) => rowData[columnDef.field]));

  new CsvBuilder(`${fileName}.csv`)
    .setDelimeter(',')
    .setColumns(csvColumns.map((columnDef) => columnDef.title))
    .addRows(data)
    .exportFile();
}
