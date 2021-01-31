import Activity from "../../models/activity";
import { CREATE_ACTIVITY, SET_ACTIVITY } from "../actions/activity";

const initialState = {
  availableActivities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACTIVITY:
      const newActivity = new Activity(
        action.activityData.id,
        action.activityData.name,
        action.activityData.description,
        action.activityData.selectedTime,
        action.activityData.latitude,
        action.activityData.longitude
      );

      return {
        ...state,
        availableActivities: state.availableActivities.concat(newActivity),
      };
    case SET_ACTIVITY:
      return {
        availableActivities: action.activities,
      };
    default:
      return state;
  }
};
