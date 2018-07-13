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

    drawGradient(2*dayRadius);
    
    line(0,0, dayRadius, 0);
    for(var i = 0; i < 24; i++){
        rotate(PI / 12);
        line(0,0, dayRadius, 0);    
    }

    pop();
}


divisions = 0;
function drawGradient(diameter){
    push();
    fill(100);
    var overlap = 0.0;
    divisions = 72;// (divisions + .277) % 250;
    var arcLength = (2*PI/divisions);

    strokeWeight(0);
    colors = [
        color(0, 0, 255), 
        color(100), 
        color(255, 0, 0),
    ];
    angles = [
        0.5, 
        PI, 
        2*PI - 0.5,
    ];

    colorIndex = angles[0] > 0 ? colors.length - 1 : 0;

    for(var i = 0; i < divisions; i++){

        var startAngle = (2*PI/divisions)*(i);
        var stopAngle = startAngle + arcLength;

        if((startAngle > angles[(colorIndex + 1) % colors.length]) && (true)){
            colorIndex = (colorIndex + 1) % colors.length;
        }
        if(startAngle > angles[angles.length - 1]){
            colorIndex = angles.length - 1;
        }


        var lerpPercent = 0;
        if(colorIndex == colors.length - 1){

            if(startAngle > angles[colorIndex]){
                lerpPercent = (startAngle - angles[colorIndex]) / ((2*PI) - angles[colorIndex]);
            } else {
                var backAngle = 2*PI - angles[colorIndex];
                lerpPercent  = (startAngle + backAngle)/(angles[0] + backAngle);
            }

            fill(lerpColor(colors[colorIndex],colors[0], lerpPercent));

        } else {

            lerpPercent  = (startAngle - angles[colorIndex])/(angles[(colorIndex+1) % colors.length] - angles[colorIndex]);
            fill(lerpColor(colors[colorIndex],colors[colorIndex+1], lerpPercent));
        }

        arc(0, 0, diameter, diameter, startAngle - overlap, stopAngle, PIE);
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