import faker from "faker";

export const createData = (qty = 5000) => {
  let data = [];

  for (let i = 0; i < qty; i++) {
    const d = {
      id: faker.datatype.uuid(),
      product: faker.commerce.product(),
      price: faker.commerce.price(),
      calories: faker.datatype.number({ max: 1000 }),
      fat: faker.datatype.float({ max: 50, precision: 0.1 }),
      carbs: faker.datatype.number({ max: 100 }),
      protein: faker.datatype.float({ max: 50, precision: 0.1 })
    };

    data.push(d);
  }

  return data;
};
