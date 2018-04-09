var outerRadius;
var screenScale = 0.8;

var d = new Date();

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    strokeWeight(2);
    stroke(255);
    noFill();

    outerRadius = screenScale * (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 2;    
}


function draw() {
    d = new Date();

    drawClockFace();
    drawHand();
    drawDateStamp();

    // d.setDate(d.getDate() + 0.2);
}

monthAngles = [
    15/(48*5),// jan
    15/(48*5),
    15/(48*5),
    15/(48*5),
    15/(48*5),
    3/24,
    3/24, //jul
    15/(48*4),
    15/(48*4),
    15/(48*4),
    15/(48*4),
    3/24, //dec
]

function drawClockFace(){
    setup();
    push();
    stroke(255);
    translate(window.innerWidth/2, window.innerHeight/2);

    fill(0);
    strokeWeight(2);
    ellipse(0,0,2*outerRadius);


    stroke(255);
    rotate(TAU * 3/16); // january start angle

    line(0,0, outerRadius, 0);
    for(var i in monthAngles){
        rotate(-TAU * monthAngles[i]);
        line(0,0, outerRadius, 0);    
    }

    pop();
}

function drawHand(){
    push();
        stroke(255, 0, 0);
        translate(window.innerWidth/2, window.innerHeight/2);
        rotate(TAU * 3/16);

        for(var i = 0; i < d.getMonth(); i++){
            rotate(-monthAngles[i]*TAU);
        }

        //rotate to angle of day
        var daysInMoth = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
        rotate(-TAU*monthAngles[d.getMonth()] * (d.getDate()/daysInMoth))
        
        line(0,0,outerRadius, 0);        
        
        stroke(255);
        fill(0);
        ellipse(0,0,outerRadius*1.5);
        noFill()
        ellipse(0,0,outerRadius*2);
    pop();
}

function drawDateStamp(){
    noStroke();
    fill(0);
    rect(0,10, 500, 30);
    fill(255);
    textFont('monospace');
    textSize(20);
    text(d, 10, 30);
}

window.addEventListener('resize', function(){
    setup();
})