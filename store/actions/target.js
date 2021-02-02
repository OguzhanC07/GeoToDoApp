import apiUrl from "../../constants/apiUrl";
import Target from "../../models/target";

export const CREATE_TARGET = "CREATE_TARGET";
export const DELETE_TARGET = "DELETE_TARGET";
export const SET_TARGET = "SET_TARGET";
export const COMPLETE_TARGET = "COMPLETE_TARGET";

export const fetchTarget = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;

    try {
      const response = await fetch(apiUrl.baseUrl + `target/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ooops! Bir şeyler ters gitti.");
      }

      const resData = await response.json();
      const loadedTargets = [];

      for (const key in resData) {
        if (Object.hasOwnProperty.call(resData, key)) {
          loadedTargets.push(
            new Target(
              resData[key].id.toString(),
              resData[key].name,
              resData[key].savedTime,
              resData[key].achievedTime,
              resData[key].isAchieved
            )
          );

          dispatch({
            type: SET_TARGET,
            targets: loadedTargets.filter((act) => act.isAchieved == false),
            achieved: loadedTargets.filter((act) => act.isAchieved == true),
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createTarget = (name) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(apiUrl.baseUrl + "target", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        appuserid: userId,
      }),
    });

    if (!response.ok) {
      throw new Error("OOps bir şeyler ters gitti");
    }

    const resData = await response.json();
    dispatch({
      type: CREATE_TARGET,
      targetData: {
        id: resData.name,
        name: resData.name,
      },
    });
  };
};

export const deleteTarget = (targetId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(apiUrl.baseUrl + `target/${targetId}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ooops! Bir şeyler ters gitti");
      }

      dispatch({ type: DELETE_TARGET, aid: targetId });
    } catch (err) {
      console.log(err);
    }
  };
};

export const completeTarget = (targetId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        apiUrl.baseUrl + `target/CompleteTarget/${targetId}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Ooops! Bir şeyler ters gitti");
      }

      dispatch({ type: COMPLETE_TARGET, aid: targetId });
    } catch (err) {
      console.log(err);
    }
  };
};
