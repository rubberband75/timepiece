var dayRadius;
var screenScale = 0.8;

var d = new Date();

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    strokeWeight(2);
    stroke(255);
    noFill();

    // dayRadius = screenScale * (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 2;    
}


function draw() {
    d = new Date();

    drawDay();

    drawDateStamp();

    // d.setDate(d.getDate() + 0.0002);
}


function drawDay(){
    var dayScale = screenScale;
    dayRadius = dayScale * (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 2;
    drawDayFace();
    drawDayHand();
}

function drawDayFace(){
    setup();
    push();
    stroke(255);
    translate(window.innerWidth/2, window.innerHeight/2);

    fill(0);
    strokeWeight(2);
    ellipse(0,0,2*dayRadius);
    stroke(255);

    line(0,0, dayRadius, 0);
    for(var i = 0; i < 24; i++){
        rotate(PI / 12);
        line(0,0, dayRadius, 0);    
    }

    pop();
}

function drawDayHand(){
    push();
        stroke(255, 0, 0);
        translate(window.innerWidth/2, window.innerHeight/2);
        rotate(PI/2);

        //rotate to angle of hour
        var secondAngle = map((d.getHours())*60*60 + (d.getMinutes())*60 + (d.getSeconds()), 0 , 60 * 60 * 24 , 0, 2*PI);

        rotate(secondAngle)
        
        line(0,0,dayRadius, 0);        
        
        stroke(255);
        fill(0);
        ellipse(0,0,dayRadius*1.5);
        noFill()
        ellipse(0,0,dayRadius*2);
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