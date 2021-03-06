/**
 * Internal dependencies
 */
import { combineReducers, keyedReducer } from 'state/utils';
import {
	JETPACK_MODULE_ACTIVATE_SUCCESS,
	SITE_CHECKLIST_RECEIVE,
	SITE_CHECKLIST_TASK_UPDATE,
} from 'state/action-types';
import { items as itemSchemas } from './schema';

const markChecklistTaskComplete = ( state, taskId ) => ( {
	...state,
	tasks: { ...state.tasks, [ taskId ]: true },
} );

function items( state = {}, action ) {
	switch ( action.type ) {
		case SITE_CHECKLIST_RECEIVE:
			return action.checklist;
		case SITE_CHECKLIST_TASK_UPDATE:
			return markChecklistTaskComplete( state, action.taskId );
		case JETPACK_MODULE_ACTIVATE_SUCCESS:
			if ( action.moduleSlug === 'monitor' ) {
				return markChecklistTaskComplete( state, 'jetpack_monitor' );
			}
			break;
	}
	return state;
}
items.schema = itemSchemas;

const reducer = combineReducers( {
	items,
} );

export default keyedReducer( 'siteId', reducer );
