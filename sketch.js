var outerRadius;
var screenScale = 0.8;

var d = new Date();

function setup() {
    drawClockFace()
}


function draw() {
    d = new Date();
    drawClockFace();
    drawHand();
    drawDateStamp();

    // d.setDate(d.getDate() + (1/(24*60.0)));
}

function drawClockFace(){
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    strokeWeight(2);
    stroke(255);
    noFill();

    outerRadius = screenScale * (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 2;

    push();
    translate(window.innerWidth/2, window.innerHeight/2);
    ellipse(0,0,2*outerRadius);

    y = -0.05*outerRadius;y = 0;
    x = sqrt(outerRadius**2 - y**2)

    line(-x, y, x, y);
    line(0, y, 0, -outerRadius);
    // pop();

    // push();
        rotate(-PI/2);
        m = 0.03;m=0;
        a = 6/5.0 * PI;
        line(-y,-3*m*outerRadius, outerRadius*sin(a), outerRadius*cos(a));
        a = 7/5.0 * PI;
        line(-y,-m*outerRadius, outerRadius*sin(a), outerRadius*cos(a));
        a = 8/5.0 * PI;
        line(-y,m*outerRadius, outerRadius*sin(a), outerRadius*cos(a));
        a = 9/5.0 * PI;
        line(-y,3*m*outerRadius, outerRadius*sin(a), outerRadius*cos(a));
    pop();
}

function drawHand(){
    push();
        stroke(255, 0, 0);
        translate(window.innerWidth/2, window.innerHeight/2);

        //rotate to begining angle of day
        if(d.getDay() == 0){
            rotate(-PI/2);
        }else{
            rotate(((4+d.getDay())/-5)*PI)
        }

        //rotate to angle of minute within day
        var dayRange;
        if(d.getDay() == 0 || d.getDay() == 6){
            dayRange = PI/2;
        }else{
            dayRange = PI/5;
        }
        //map secconds to angle within day
        var secondAngle = map((d.getHours())*60*60 + (d.getMinutes())*60 + (d.getSeconds()), 0 , 60 * 60 * 24 , 0, dayRange);
        rotate(-secondAngle);
        
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