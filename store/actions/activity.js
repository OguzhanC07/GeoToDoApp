import apiUrl from "../../constants/apiUrl";
import Activity from "../../models/activity";

export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const SET_ACTIVITY = "SET_ACTIVITY";
export const DELETE_ACTIVITY = "DELETE_ACTIVITY";
export const COMPLETE_ACTIVITY = "COMPLETE_ACTIVITY";

export const fetchActivity = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    try {
      const response = await fetch(apiUrl.baseUrl + `activity/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        throw new Error("Oopps! Bir şeyler ters gitti.");
      }
      const resData = [1, 2]
      const loadedActivities = [];

      for (const key in resData) {
        loadedActivities.push(
          new Activity(
            resData[key].toString(),
            "Web servis yazılacak",
            "Ürün detaylarınının listelenmesi için ürün id ile çalışan web servis yazılacak",
            "08/02/2023",
            "43",
            "44",
            false
          )
        );
      }

      dispatch({
        type: SET_ACTIVITY,
        activities: loadedActivities.filter((act) => act.isCompleted == false),
        location: loadedActivities.filter(
          (act) => act.latitude !== 0 && act.longitude !== 0
        ),
        completed: loadedActivities.filter((act) => act.isCompleted == true),
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const deleteActivity = (activityId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(apiUrl.baseUrl + `activity/${activityId}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        throw new Error("Ooops! Bir şeyler ters gitti");
      }

      dispatch({ type: DELETE_ACTIVITY, aid: activityId });
    } catch (err) {
      console.log(err);
    }
  };
};

export const completeActivity = (activityId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(
        apiUrl.baseUrl + `activity/CompleteActivity/${activityId}`,
        {
          method: "Put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        throw new Error("Ooops! Bir şeyler ters gitti");
      }

      dispatch({ type: COMPLETE_ACTIVITY, aid: activityId });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createActivity = (
  name,
  description,
  selectedtime,
  latitude,
  longitude
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const response = await fetch(apiUrl.baseUrl + "activity", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        selectedtime,
        latitude,
        longitude,
        appuserid: userId,
      }),
    });

    if (response.ok) {
      throw new Error(await response.json());
    }

    const resData = await response.json();
    dispatch({
      type: CREATE_ACTIVITY,
      activityData: {
        id: "1",
        name: "Sınava çalış",
        description: "Sınava çalışSınava çalışSınava çalışSınava çalışSınava çalış",
        selectedTime: "08/02/2023",
        latitude: "43",
        longitude: "44",
      },
    });
  };
};
