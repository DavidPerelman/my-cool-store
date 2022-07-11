// function reducer(state, action) {
//   console.log(action.id);
//   console.log(state);
//   switch (action.type) {
//     case 'userOrders':
//       console.log({ state: action.id });
//       return (state = action.id);
//     case 'decrement':
//       return { count: state.count - 1 };
//     default:
//       throw new Error();
//   }
// }

// function reducer(state, { type, id }) {
//   console.log(id);
//   console.log(state);
//   //   return;
//   switch (type) {
//     case 'userOrders':
//       const res = state.filter((order) => order._id === id);
//       console.log(res);
//       return res._id;

//       return { state: id };
//     default:
//       throw new Error();
//   }
// }

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_ORDER_LINK':
      console.log({ orderId: (state.orderId = action.data) });
      return { orderId: action.data };
    // return `/order/${action.data}`;
    default:
      return state;
  }
};

export { reducer };
