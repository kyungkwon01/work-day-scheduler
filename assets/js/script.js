// Declare jQuery selector to variables.
var timeDisplayEl = $("#currentDay");
var timeBlockEl = $(".time-block");
var saveBtnEl = $(".saveBtn");
var currentHour = dayjs().format("H");

$(function () {
  // Add click event listeners to saveBtnEl and declare variables to data in the block associated with the saveBtnEl.
  saveBtnEl.click(function () {
    var timeBlock = $(this).closest(".time-block");
    var hour = timeBlock.data("hour");
    var text = timeBlock.find("textarea").val();
    // Stores the two key values(time-block-hour and text) to the localStorage.
    localStorage.setItem("time-block-" + hour, text);
  });
  timeBlockEl.each(function () {
    var hour = $(this).data("hour");
    var text = localStorage.getItem("time-block-" + hour);
    // If text exists in the text key value in the localStorage, calls it and add it to the text box within the block.
    if (text) {
      $(this).find("textarea").val(text);
    }
  });

  // Function to grab the time id of individual time block and compares it with the current time. It adds past, present, or future calls to each block.
  timeBlockEl.each(function () {
    var hourBlockEl = parseInt(this.id.split("hour-")[1]);
    var currentHourInt = parseInt(currentHour);
    if (hourBlockEl < currentHourInt) {
      $(this).addClass("past");
    } else if (hourBlockEl === currentHourInt) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Function that sets up a variable for dayjs api that shows the current month, day, and year and displays them in the header.
  function displayTime() {
    var rightNow = dayjs().format("dddd, MMM DD, YYYY");
    timeDisplayEl.text(rightNow);
  }

  displayTime();
  setInterval(displayTime, 1000);
});
