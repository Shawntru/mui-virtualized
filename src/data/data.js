import faker from "faker";

export const createData = (rowAmount = 5000, columnAmount = 80) => {
  let data = [];

  for (let i = 0; i < rowAmount; i++) {
    let columns = {}

    for (let i = 0; i < columnAmount; i++) {
      columns['column' + (i + 1)] = faker.datatype.uuid()
    }

    data.push(columns);
  }

  return data;
};
