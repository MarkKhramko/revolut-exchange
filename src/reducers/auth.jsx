import { SET_TOKEN } from '../constants/AuthActions';

const initialState = {

	shouldRefreshToken: true,
	token: ""
};

export default function auth(state = initialState, action) {

  switch (action.type) {

    case SET_TOKEN:
      return {
        token: action.token,
        shouldRefreshToken: false
      };

    default:
      return state;
  }
}
