import Target from "../../models/target";
import {
  COMPLETE_TARGET,
  CREATE_TARGET,
  DELETE_TARGET,
  SET_TARGET,
} from "../actions/target";

const initialState = {
  availableTargets: [],
  completedTargets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TARGET:
      const newTarget = new Target(
        action.targetData.id,
        action.targetData.name,
        new Date(),
        null,
        false
      );

      return {
        ...state,
        availableTargets: state.availableTargets.concat(newTarget),
      };
    case SET_TARGET: {
      return {
        availableTargets: action.targets,
        completedTargets: action.achieved,
      };
    }
    case DELETE_TARGET: {
      return {
        ...state,
        availableTargets: state.availableTargets.filter(
          (act) => act.id !== action.aid
        ),
      };
    }
    case COMPLETE_TARGET:
      var target = state.availableTargets.filter(
        (tar) => tar.id === action.aid
      );
      var updatedTargets = state.completedTargets.concat(target);
      return {
        ...state,
        availableTargets: state.availableTargets.filter(
          (act) => act.id !== action.aid
        ),
        completedTargets: updatedTargets,
      };
    default:
      return state;
  }
};
