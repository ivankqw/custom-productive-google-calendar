// This script injects an element at the top of the page.

// set default background here 
let defaultImage = "https://drive.google.com/file/d/1rd0zfgML17-NaDpU0ZnSsKNkkwW16kHT/view?usp=share_link"

// map to correct link format  
defaultImage = "https://drive.google.com/uc?export=view&id=" + defaultImage.split("/")[5] 

let pomodoroImages = [
  "https://drive.google.com/file/d/1yxhLDGYwKv3Sa3DkwT6Rze3L8wDoNH-c/view?usp=share_link",
  "https://drive.google.com/file/d/1R0Xpa4yNWU-RpY372vp5xnf2Abkl-nyq/view?usp=share_link",
  "https://drive.google.com/file/d/18kSGZPwklQaavsiT_ct8QxMswDIbzrzJ/view?usp=share_link"
]

pomodoroImages = pomodoroImages.map((driveLink) => {
  let id = driveLink.split("/")[5]
  return "https://drive.google.com/uc?export=view&id=" + id 
})

function createImageDOM() {
  let imgDiv = document.createElement('div');
  let imgOverlay = document.createElement('div');
  let img = document.createElement('div');
  imgDiv.id = 'imgDiv';
  img.id = 'img';
  imgOverlay.id = 'imgOverlay'
  imgDiv.appendChild(img);
  imgDiv.appendChild(imgOverlay);
  return imgDiv;
}

function showImage() {
  console.log("Installing Calendar background extension...");
  let banner = document.getElementById('gb');
  let imageDOM = createImageDOM();
  banner.parentElement.insertBefore(imageDOM, banner);
}

function updateBackground(imageURL) {
  document.getElementById('img').style.backgroundImage = "url('" + imageURL + "')";
  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
      document.getElementById('img').style.backgroundImage = "url('" + imageURL + "')";
    }
  }); 
}

function createPomodoroButtonDOM() {
  let button = document.createElement('a');
  button.id = 'xtnBtn';
  button.className = TOP_BUTTONS_CLASS;
  button.title = 'Background';

  button.innerHTML = `
    <span class="xjKiLb">
      <span class="Ce1Y1c" style="padding: 5px;">
        <svg class="svg-icon" viewBox="0 0 20 20">
							<path fill="none" d="M11.088,2.542c0.063-0.146,0.103-0.306,0.103-0.476c0-0.657-0.534-1.19-1.19-1.19c-0.657,0-1.19,0.533-1.19,1.19c0,0.17,0.038,0.33,0.102,0.476c-4.085,0.535-7.243,4.021-7.243,8.252c0,4.601,3.73,8.332,8.332,8.332c4.601,0,8.331-3.73,8.331-8.332C18.331,6.562,15.173,3.076,11.088,2.542z M10,1.669c0.219,0,0.396,0.177,0.396,0.396S10.219,2.462,10,2.462c-0.22,0-0.397-0.177-0.397-0.396S9.78,1.669,10,1.669z M10,18.332c-4.163,0-7.538-3.375-7.538-7.539c0-4.163,3.375-7.538,7.538-7.538c4.162,0,7.538,3.375,7.538,7.538C17.538,14.957,14.162,18.332,10,18.332z M10.386,9.26c0.002-0.018,0.011-0.034,0.011-0.053V5.24c0-0.219-0.177-0.396-0.396-0.396c-0.22,0-0.397,0.177-0.397,0.396v3.967c0,0.019,0.008,0.035,0.011,0.053c-0.689,0.173-1.201,0.792-1.201,1.534c0,0.324,0.098,0.625,0.264,0.875c-0.079,0.014-0.155,0.043-0.216,0.104l-2.244,2.244c-0.155,0.154-0.155,0.406,0,0.561s0.406,0.154,0.561,0l2.244-2.242c0.061-0.062,0.091-0.139,0.104-0.217c0.251,0.166,0.551,0.264,0.875,0.264c0.876,0,1.587-0.711,1.587-1.587C11.587,10.052,11.075,9.433,10.386,9.26z M10,11.586c-0.438,0-0.793-0.354-0.793-0.792c0-0.438,0.355-0.792,0.793-0.792c0.438,0,0.793,0.355,0.793,0.792C10.793,11.232,10.438,11.586,10,11.586z"></path>
				</svg>
      </span>
    </span>
  `;
  button.addEventListener("click", startPomodoro);
  return button;
}

function createPomodoroTimerDOM() {
  let timer = document.createElement('div');
  timer.id = 'pomodoro-timer';
  timer.className = TOP_BUTTONS_CLASS;
  timer.title = 'Background';

  timer.innerHTML = `
    <span class="xjKiLb">
      <span class="Ce1Y1c" style="padding: 5px;">
      </span>
    </span>
  `;
  return timer;
}

function showPomodoro() {
  let addButton = document.querySelector('.' + BUTTON_HOLDER_CLASS);
  let pomodoroButton = createPomodoroButtonDOM();
  let pomodoroTimer = createPomodoroTimerDOM();
  addButton.insertBefore(pomodoroButton, addButton.firstElementChild);
  addButton.insertBefore(pomodoroTimer, addButton.firstElementChild);
}

async function startPomodoro() {
  let countToLongBreak = 5 - pomoCount % 5 - 2;
  let longBreakMessage = countToLongBreak != 0 ? countToLongBreak + " more Pomodoro(s) after current Pomodoro to Long Break!\n\n" : "Long Break next!"
  let progressMessage = "You have completed " + pomoToHoursAndMinutes(pomoCount) + " of focus time so far, keep it up!\n\n";
  if (confirm("Starting 25min Pomodoro " + String(pomoCount + 1) + " now!\n\n" + longBreakMessage + progressMessage)) {
    updateBackground(pomodoroImages[0]);
    //POMODORO: 25 minutes or 1500000 ms
    await startTimer(pomodoroTime);
    //only count pomodoro once finished
    pomoCount++;
    progressMessage = "You have completed " + pomoToHoursAndMinutes(pomoCount) + " of focus time so far, keep it up!\n\n";
    let endMessage = "Pomodoro " + String(pomoCount) + " completed!\n\n"
    if (pomoCount % 5 == 0) {
      //take a long break
      if (confirm(endMessage + progressMessage + " Take a 15min Long Break?")) {
        startLongBreak();
      } else {
        cancelPomo();
      }
    } else {
      //take a short break
      if (confirm(endMessage + progressMessage + " Take a 5min Short Break?")) {
        startShortBreak();
      } else {
        cancelPomo();
      }
    }
  } else {
    cancelPomo();
  } 
}

function convertMilliseconds(ms) {
  // Extract the minutes and seconds 
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  // Return the time as a string in the format "minutes:seconds"
  return (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

function pomoToHoursAndMinutes(pomo) {
  let minutes = pomo * 25;
  let m = minutes % 60;
  let h = Math.floor(minutes / 60);
  return h + ' hours and ' + m + ' minutes';
}

async function startTimer(ms) {
  let doRun = true; 
  // Initialize the countdown counter
  let countdownCounter = ms;
  // Get a reference to the countdown timer element on the page
  const countdownTimer = document.getElementById("pomodoro-timer");
  // Update the countdown timer every 1000 milliseconds (1 second)
  while (doRun) {
    countdownTimer.innerHTML = convertMilliseconds(countdownCounter);
    await new Promise(r => setTimeout(r, 1000));
    // Decrement the countdown counter
    countdownCounter -= 1000;
    if (countdownCounter < 0) {
      doRun = false
      console.log("Timer complete");
      //alert('Countdown finished!');
    }
  }
}

function cancelPomo() {
  console.log("Canceled Pomodoro");
  //change back to default bg
  updateBackground(defaultImage);
  //reset pomo counter
  pomoCount = 0;
  //remove countdown timer
  document.getElementById("pomodoro-timer").innerHTML = "";
}

async function startShortBreak() {
  console.log("short break now")
  updateBackground(pomodoroImages[1]);
  //SHORT BREAK: 5 minutes or 300000 ms
  await startTimer(shortBreakTime);
  startPomodoro();
}

async function startLongBreak() {
  console.log("long break now")
  updateBackground(pomodoroImages[2]);
  //LONG BREAK: 15 minutes or 900000 ms
  await startTimer(longBreakTime);
  startPomodoro();
}

const pomodoroTime = 5000;
const shortBreakTime = 5000;
const longBreakTime = 5000;
const BUTTON_HOLDER_CLASS = 'uW9umb';
const TOP_BUTTONS_CLASS = 'd6McF';
let pomoCount = 0;

showImage();
showPomodoro();
updateBackground(defaultImage);
