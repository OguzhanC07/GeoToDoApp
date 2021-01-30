import apiUrl from "../../constants/apiUrl";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";

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
