// This script injects an element at the top of the page.
pics = ["https://drive.google.com/file/d/1rd0zfgML17-NaDpU0ZnSsKNkkwW16kHT/view?usp=share_link", 
        "https://drive.google.com/file/d/1y2AUG11mYGhrcMXsxvlw6h160Adhdzjg/view?usp=share_link"]

pics = pics.map((driveLink) => {
  let id = driveLink.split("/")[5]
  return "https://drive.google.com/uc?export=view&id=" + id 
})

let imgSelection = pics[1]

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

function installImage() {
  console.log("Installing Calendar background extension...");
  let banner = document.getElementById('gb');
  let imageDOM = createImageDOM();
  banner.parentElement.insertBefore(imageDOM, banner);
  banner.parentElement.insertBefore(imageDOM, banner);
}

installImage()

// index of the current image
let currentIndex = 0;
// function to change the background image
function updateBackground() {
  document.getElementById('img').style.backgroundImage = "url('" + pics[currentIndex] + "')";
  document.addEventListener("visibilitychange", function() {
    if (document.visibilityState === 'visible') {
      document.getElementById('img').style.backgroundImage = "url('" + pics[currentIndex] + "')";
    }
  });  // increment the currentIndex
  currentIndex = (currentIndex + 1) % pics.length;
}
// call the function every 10 minutes (600,000 milliseconds)
console.log("hello")
updateBackground();
setInterval(updateBackground, 20000);









