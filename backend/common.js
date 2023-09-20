export const refineData = (data) => {
  const refinedData = data.map((ele) => {
    return ele.goal;
  });
  return refinedData;
};
