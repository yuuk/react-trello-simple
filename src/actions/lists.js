import faker from 'faker';

export const GET_LISTS = 'GET_LISTS';
export const MOVE_CARD = 'MOVE_CARD';

export function getLists(quantity) {
  return (dispatch) => {
    const lists = [];
    let count = 0;
    for (let i = 0; i < quantity; i++) {
      const cards = [];
      for (let ic = 0; ic < 2; ic++) {
        cards.push({
          id: count,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          title: faker.name.jobTitle()
        });
        count = count + 1;
      }
      lists.push({
        id: i,
        name: faker.commerce.productName(),
        cards
      });
    }
    dispatch({ type: GET_LISTS, lists, isFetching: true });
  };
}

export function moveCard(lastX, lastY, nextX, nextY) {
  return (dispatch) => {
    dispatch({ type: MOVE_CARD, lastX, lastY, nextX, nextY });
  };
}
