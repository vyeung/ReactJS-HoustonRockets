/*this function takes the ISO input date format YYYY-MM-DD and 
converts it to Month Day, Year
Ex: Nov 14, 2018
*/

const convertDate = (ISOdate) => {

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", 
                  "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  //replacing with "/" fixes problem of day being off by 1
  const versionWithSlashes = new Date(ISOdate.replace(/-/g, "/"));

  const myDate = months[versionWithSlashes.getMonth()] + " " + 
                 versionWithSlashes.getDate() + ", " + 
                 versionWithSlashes.getFullYear();
  
  return myDate;
}

export default convertDate;