import { getProductData } from './fetcher'


$(document).ready(async function () {
  await getProductData();
});

