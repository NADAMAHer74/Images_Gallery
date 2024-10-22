const intiatialState = { images: [] };
export const imagesSlice = (state = intiatialState, action) => {
  switch (action.type) {
    case "Get_Images":
      return { ...state, images: action.payload };

    default:
      return state;
  }
};
