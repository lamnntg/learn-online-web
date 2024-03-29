import { combineReducers } from 'redux';
import messageReducer from './message/message.reducer';
import authReducer from './auth/auth.reducer';
import questionReducer from './question/question.reducer';

const appReducer = combineReducers({
	auth: authReducer,
	message: messageReducer,
	question: questionReducer,
});

const rootReducer = (state, action) => {
	if (action.type === 'RESET_DATA') {
		state = undefined;
	}

	return appReducer(state, action);
};
export default rootReducer;
