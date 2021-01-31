import apiUrl from "../../constants/apiUrl";
import Activity from "../../models/activity";

export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const SET_ACTIVITY = "SET_ACTIVITY";

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

      if (!response.ok) {
        throw new Error("Oopps! Bir şeyler ters gitti.");
      }
      const resData = await response.json();
      const loadedActivities = [];

      for (const key in resData) {
        loadedActivities.push(
          new Activity(
            key,
            resData[key].name,
            resData[key].description,
            resData[key].selectedTime,
            resData[key].latitude,
            resData[key].longitude
          )
        );
      }

      dispatch({
        type: SET_ACTIVITY,
        activities: loadedActivities,
      });
    } catch (err) {
      console.log(err);
      throw err;
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

    if (!response.ok) {
      throw new Error(await response.json());
    }

    const resData = await response.json();
    dispatch({
      type: CREATE_ACTIVITY,
      activityData: {
        id: resData.name,
        name: resData.name,
        description: resData.description,
        selectedTime: resData.selectedTime,
        latitude: resData.latitude,
        longitude: resData.longitude,
      },
    });
  };
};
