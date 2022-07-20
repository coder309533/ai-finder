objects = [];
 status = "";


function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO); 
    video.size(480, 380);
    video.hide(); 

}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects ";
    objectName = document.getElementById("textbox").value;
    
}


function modelLoaded() {
    console.log("Model Loaded!");
    status = true; 
    

}

function gotResult(error, results) {
 if(error) {
    console.log(error);

 }

 else {
    console.log(results);
    objects = results;

 }
}


function draw() {
    image(video, 0, 0, 480, 380);
    if(status !="") {
        objectDetector.detect(video, gotResult);
        for( i=0 ; i<objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
           
            fill("#00fffb");
            percent = floor(objects[i]. confidence * 100);
            text(objects[i].label + " "+ percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill() 
            stroke("#00fffb");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
             
            if(objects[i].label == objectName ) {
                document.getElementById("object1").innerHTML = objectName + " Found";

                

            }
            else {
                document.getElementById("object1").innerHTML = objectName + " Not Found"
            }
        }
    }

}
