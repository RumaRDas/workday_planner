const headerDate = $("#current-date");
const container = $(".container");
let currentHour;
let currentMinute;
//declearing hour array
let hourArry = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];
//schedule data is an object with 2 elements, a date and an array of time:event pairs
let dateKey;
let todayTime = {
    date : "",
    00 : "",
    01 : "",
    02 : "",
    03 : "",
    04 : "",
    05 : "",
    06 : "",
    07 : "",
    08 : "",
    09 : "",
    10 : "",
    11 : "",
    12 : "",
    13 : "",
    14 : "",
    15 : "",
    16 : "",
    17 : "",
    18 : "",
    19 : "",
    20 : "",
    21 : "",
    22 : "",
    23 : "",
    24 : ""
};
//start the MomentJS time request before document is fully loaded
function getDateInfo(){
    let date = moment().format('dddd, MMM Do');
    headerDate.text(date);
    currentHour = moment().format('H');
    currentMinute = parseInt(moment().format('mm'));
    dateKey = moment().format('YYYYMMDD');
}
getDateInfo();
// get times am pm with moment js from moment
const time= moment().format('HH:mm:ss');
var formatted = moment(time, "HH:mm:ss").format("LT");
let $dateTiming = $("#current-time")
$dateTiming.text(formatted);


function getDayEvents(date){
  let dateCheck = localStorage.getItem(dateKey);
  if (dateCheck) {
    todayTime = JSON.parse(dateCheck);
  }

  function getHourEvent(hour){
    return(todayTime[hour]);
}
//This will be called on page load and will populate any saved info.
$(document).ready(function() { 
   //function to populate the page with time blocks for 5AM to 12AM
  function loadTime(){
   for (let i = 7; i < 18; i++) {
      let nextRow = $("<div>");
      let nextColumn;
      nextRow.addClass("row");
      for (let k = 0; k < 3; k++){
        switch (k){               
          case 0:
              nextColumn = $("<div>");
              nextColumn.addClass("col-1 hour");
              nextColumn.text(hourArry[i]);
              break;
              case 1:
                nextColumn = $("<textarea>");
                nextColumn.text(getHourEvent(i));
                if (i < currentHour){
                    nextColumn.addClass("col-10 details past");
                }
                else if (i == currentHour){
                    nextColumn.addClass("col-10  details present");
                }
                else{
                    nextColumn.addClass("col-10  details future");
                }
                break;
            case 2:
                nextColumn = $("<div>");
                nextColumn.addClass("col-1 saveBtn text-center");
                nextColumn.attr("name", hourArry[i]);
                nextColumn.html("<i class='far fa-save mt-4'>");
                break;
        }
        nextRow.append(nextColumn);
            }
            container.append(nextRow);      
           }
          }
      
          getDayEvents(dateKey);
          loadTime();
});
}