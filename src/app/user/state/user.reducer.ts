export const userActions = {
  MASK_USER_NAME: "MASK_USER_NAME"
};

export function reducer(state, action) {
  switch (action.type) {
    case userActions.MASK_USER_NAME:
      return { ...state, maskUserName: action.payload };
    default: return state;
  }
}
