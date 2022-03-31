noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(500, 500);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', getPoses);
}

function modelLoaded()
{
    console.log('Posenet is initialized');
}

function getPoses(results)
{
    if (results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX - " + noseX + ", noseY - " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x; 
        difference = floor(leftWristX - rightWristX); 
    }
}

function draw()
{
    background('#696969');
    document.getElementById("square_side").innerHTML = "Width & height of the square is " + difference + "px";
    fill('#FF0000');
    stroke('#FF0000');
    square(noseX, noseY, difference);
}