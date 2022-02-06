const getFirstAndLastPages = (page, pageQuantity) => {
  let firstPage = page - 2 > 0 ? page - 2 : 1;
  const lastPage = firstPage + 4 <= pageQuantity ? firstPage + 4 : pageQuantity;
  firstPage = lastPage - firstPage === 4 ? firstPage : pageQuantity - 4;

  return { firstPage, lastPage };
};

const setPage = (page, index) => {
  if (page === index) return `**${index}**`;
  return index.toString();
};

const getNumbersArray = (page, firstPage, lastPage) => {
  const result = [];
  for (let index = firstPage; index <= lastPage; index += 1) {
    result.push(setPage(page, index));
  }
  return result;
};

const addEllipsis = (array, pageQuantity) => {
  if (array[0] > 1) array.unshift('...');
  if (array[array.length - 1] < pageQuantity) array.push('...');
  return array;
};

module.exports = (page, pageQuantity) => {
  if (pageQuantity <= 5) return getNumbersArray(page, 1, pageQuantity);

  const { firstPage, lastPage } = getFirstAndLastPages(page, pageQuantity);
  const numbersArray = getNumbersArray(page, firstPage, lastPage);
  const pagination = addEllipsis(numbersArray, pageQuantity);

  return pagination;
};
