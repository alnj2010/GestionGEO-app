import { CsvBuilder } from 'filefy';

export const URL = {
  ADMIN: '/admin',
  BRAND: '/brand',
  BRAND_CATEGORY: '/categoryBrand',
  CATEGORY: '/category',
  COUPON: '/coupon',
  EXTERNAL_LINK: '/links',
  INITIAL_PHASE: '/initial-phase',
  MASTER: '/master',
  MINIGAME_TRIVIA: '/trivia',
  QUESTION: '/question',
  SCRATCH_OFF: '/scratch-off',
  USER: '/user',
  AUTH:'/auth',
  WALLET: '/premium/wallet',
  TRIVIA_CATEGORY: '/trivia-category',
  LOCATION: '/location',
  PRIZE:'/prize',
  ZIPCODE:'/zipcode',
  CHALLENGE:'/treasure-hunt',
  CHALLENGE_TYPE:'/challenge-type',
  MILE:'/miles'
};
export const AMOUNT_POINT=5
export const INDEX_LAST_POINT = AMOUNT_POINT-1;
export const GOOGLE_API_KEY=''
export const GOOGLE_API_MAP="https://maps.googleapis.com/maps/api/js?key="+GOOGLE_API_KEY+"&v=3.exp&libraries=geometry,drawing,places"

export const protocol =
  window.location.host === 'localhost:3000' ? 'http' : 'https';
export const apiUrl ="http://127.0.0.1:8000/api"
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
