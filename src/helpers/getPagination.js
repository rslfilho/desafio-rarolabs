const getPaginationTypeOne = (page, pageQuantity) => {
  const result = [];

  for (let index = 1; index <= pageQuantity; index += 1) {
    if (page === index) {
      result.push(`**${index}**`);
    } else {
      result.push(index.toString());
    }
  }

  return result;
};

const getPaginationTypeTwo = (page) => {
  const result = [];
  
  for (let index = 1; index <= 5; index += 1) {
    if (page === index) {
      result.push(`**${index}**`);
    } else {
      result.push(index.toString());
    }
  }

  result.push('...');

  return result;
};

const getPaginationTypeThree = (page, pageQuantity) => {
  const result = ['...'];

  for (let index = pageQuantity - 4; index <= pageQuantity; index += 1) {
    if (page === index) {
      result.push(`**${index}**`);
    } else {
      result.push(index.toString());
    }
  }
  
  return result;
};

const getPaginationTypeFour = (page) => {
  const result = ['...'];

  for (let index = page - 2; index <= page + 2; index += 1) {
    if (page === index) {
      result.push(`**${index}**`);
    } else {
      result.push(index.toString());
    }
  }

  result.push('...');

  return result;
};

module.exports = (page, pageQuantity) => {
  if (pageQuantity <= 5) return getPaginationTypeOne(page, pageQuantity);
  if (page < 4) return getPaginationTypeTwo(page);
  if (page > pageQuantity - 3) return getPaginationTypeThree(page, pageQuantity);
  return getPaginationTypeFour(page);
};
