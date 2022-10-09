function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
}
video = "";
function start() {
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML =
    "Status : Detecting Objects..bruh";
}
status = "";
objects = [];
function modelLoaded() {
  console.log("Model Loaded Yay!");
  status = true;
}
function gotResult(error, results) {
  if (error) {
    console.log("Bro, an error is happening! Fix it dum dum!");
    console.log(error);
  }
  console.log("Bro, a result is happening! Enjoy it dum dum!");
  console.log(results);
  objects = results;
}
function draw() {
  image(video, 0, 0, 380, 380);
  if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (let i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML =
        "Status : Objects Detected, unless you put in a blank pic...";
      document.getElementById("number_of_objects").innerHTML =
        "Number of Objects detected are....*drumroll*" + objects.length;
      fill(r, g, b);
      percent = floor(objects[i].confidence * 100) + " %";

      text(
        objects[i].label + " " + percent,
        objects[i].x + 15,
        objects[i].y + 15
      );
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
