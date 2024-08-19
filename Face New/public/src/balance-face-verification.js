


////////////////////////////
//------------------------importing image from localStorage or RealTime Database-------------------------//
//------------------------importing image from localStorage or RealTime Database-------------------------//
let currentUser;
let keepLoggedIn = localStorage.getItem("keepLoggedIn");
let referencedImageURL;

function getUserName() {
  if (keepLoggedIn == "yes") {
      currentUser = JSON.parse(localStorage.getItem('user'));
  } else {
      currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
}
getUserName();

if (currentUser) {
  referencedImageURL = currentUser.profileImgURL;
  if (!referencedImageURL) {
    swal("Update Profile!", "To start face verification, please upload a profile picture first in the profile section.\n\nPressing 'OK' will redirect you to the profile section.", "warning").then(function() {
      window.location.href = "/src/profile.html";
    });
  }
} 

//--------------------------------------Declaration of Variables-----------------------------------------//
const message = document.getElementById('message');
const video = document.getElementById('videoElement');
const main = document.getElementById('main');
const startBtn = document.getElementById('start-btn');

const modelsSrc = "../models";

let faceMatcher;
let canvas;
let showStartBtn = true;
let showCanvas = true;
let faceLabel;
let faceScore;
let faceVerified;

// helper function for HTML file (face-verification.html)
const clickLogoImg = () => {
  window.location.href = './home.html';
}

//-----------------------------------------face-verification--------------------------------------------//
message.innerText = "Starting Camera...";

// Loading Models
Promise.all([
  faceapi.nets.ssdMobilenetv1.loadFromUri(modelsSrc), // This is heavier and slower but more accurate
  faceapi.nets.faceLandmark68Net.loadFromUri(modelsSrc),
  faceapi.nets.faceRecognitionNet.loadFromUri(modelsSrc),
]).then(startVideo);

// Getting Camera
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => {
      video.srcObject = stream;
      // Automatically start face recognition after the video starts
      video.onloadedmetadata = () => {
        matchFace();
      };
    },
    err => console.error(err)
  );
}

// Labeling the reference image from Database and generating the face descriptor to match further
function loadAndLabelImagesFromDB() {
  const labels = ['known'];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      message.innerText = `Processing Data...`;
      const imgURL = referencedImageURL;

      const img = await faceapi.fetchImage(imgURL);

      // detect the face with the highest score in the image and compute its landmarks and face descriptor
      const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

      // storing the generated descriptor into an array called descriptions
      descriptions.push(detections.descriptor);

      // returning the label and descriptions 
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
}

// Face Matching Function
async function matchFace() {
  // calling loadAndLabelImagesFromDB function to feed it into FaceMatcher of faceapi.js
  const labeledFaceDescriptors = await loadAndLabelImagesFromDB();
  // using FaceMatcher API with 70% score which depicts the maximum descriptor distance (i.e. Euclidean Distance)
  faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.7);

  message.innerText = "Data Processed! and Camera Started!";
  setTimeout(() => {
    message.innerText = "Verifying...";
    recognize();
  }, 1000);
}

// last and final face-recognition function which will be showing the result
async function recognize() {
  // removing canvas to prevent overlapping with previous canvas
  if (canvas) canvas.remove();

  // creating canvas for displaying on webPage
  canvas = faceapi.createCanvasFromMedia(video);
  main.appendChild(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);

  const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

  if (!resizedDetections[0]) {
    swal("Face not detected!", "Please take the shot near a better light source.\nOr, Try removing the spectacles/glasses or mask.\nOr, Try updating the profile picture.", "warning");
    return;
  }

  const descriptorResult = resizedDetections[0].descriptor;
  const result = faceMatcher.findBestMatch(descriptorResult);

  faceLabel = result._label;
  faceScore = result._distance;

  if (descriptorResult && showCanvas) {
    const box = resizedDetections[0].detection.box;
    const drawBox = new faceapi.draw.DrawBox(box);
    drawBox.draw(canvas);
  }

  if (faceLabel === "known" && faceScore <= 0.45) { // Increased threshold to 0.75 for easier matching
    faceVerified = true;
    swal(`${currentUser.fullname}, you are now verified!`, "", "success");
    setTimeout(() => {
      window.location.replace("/src/customerprofile.html");
    }, 1000); // Redirect after 1 second
  } else if (faceLabel === "known" && faceScore > 0.55) {
    faceVerified = false;
    message.innerText = `Try again! We want to be more sure that it's ${currentUser.fullname}.`;
    setTimeout(() => {
      matchFace(); // Restart the face verification process
      // window.location.replace("/src/index.html");

    }, 2000); // Retry after 2 seconds
  } else {
    faceVerified = false;
    swal("Verification Failed!", "Face was not matched with the profile", "error").then(() => {
      window.location.replace('./home.html');
    });
  }
}
