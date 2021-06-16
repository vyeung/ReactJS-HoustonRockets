/*this function takes in the date format YYYYMMDD and 
converts it to Month Day, Year
Ex: Nov 14, 2018
*/
const convertDate = (date) => {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  const year  = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day   = date.substring(6, 8);

  return months[month-1] + " " + day + ", " + year;
}

export default convertDate;