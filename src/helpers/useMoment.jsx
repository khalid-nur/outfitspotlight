import moment from "moment";

export const getCurrentTimeStamp = (postTime) => {
  // Calculate the duration between the current moment and when the post was created
  const duration = moment.duration(moment().diff(postTime.toDate()));

  // If the duration is less than 60 seconds
  if (duration.asSeconds() < 60) {
    return `${Math.floor(duration.asSeconds())}s`; // Return the duration in seconds with 's'

    // If the duration is less than 60 minutes
  } else if (duration.asMinutes() < 60) {
    return `${Math.floor(duration.asMinutes())}m`; // Return the duration in minutes with 'm'

    // If the duration is less than 24 hours
  } else if (duration.asHours() < 24) {
    return `${Math.floor(duration.asHours())}h`; // Return the duration in hours with 'h'
  } else {
    // If the duration is equal to or greater than 24 hours
    return `${Math.floor(duration.asDays())}d`; // Return the duration in days with 'd'
  }
};
