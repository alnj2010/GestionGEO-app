import { CsvBuilder } from 'filefy';

export const URL = {
  ADMIN: '/administrators',
  AUTH:'/login',
  SCHOOL_PROGRAM:'/schoolPrograms',
  SUBJECT:'/subjects',
  STUDENT:'/students',
  TEACHER:'/teachers',
  SCHOOL_PERIOD:'/schoolPeriods',
  INSCRIPTION:'/inscriptions',
  STUDENT_INSCRIPTION:'/studentInscription',
  TEACHER_INSCRIPTION:'/teacherInscription',
  CONSTANCE:'/constance',
  CHANGE_PASSWORD:'/changePassword'
};

export const protocol =
  window.location.host === 'localhost:3000' ? 'http' : 'https';
export const apiUrl ="https://ancient-sea-70320.herokuapp.com/api"
export const EMAIL_REGEX = /[^@]+@[^@]+\.[a-zA-Z]{2,6}/;

export function headers(type) {
  let items;
  if (type === 'form') items = { 'Content-Type': 'multipart/form-data' };
  else items = { 'Content-Type': 'application/json' };
  const token = sessionStorage.getItem('GeoToken');
  if (token) {
    items.Authorization = `Bearer ${token}`;
  }
  return items;
}

export function handleExportCsv(columns, renderData, fileName) {
  const csvColumns = columns.filter(columnDef => {
    return !columnDef.hidden && columnDef.field && columnDef.export !== false;
  });
  const data = renderData.map(rowData =>
    csvColumns.map(columnDef => rowData[columnDef.field]),
  );

  new CsvBuilder(`${fileName}.csv`)
    .setDelimeter(',')
    .setColumns(csvColumns.map(columnDef => columnDef.title))
    .addRows(data)
    .exportFile();
}
