class Activity {
  constructor(
    id,
    name,
    description,
    selectedTime,
    latitude,
    longitude,
    isCompleted
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.selectedTime = selectedTime;
    this.latitude = latitude;
    this.longitude = longitude;
    this.isCompleted = isCompleted;
  }
}

export default Activity;
