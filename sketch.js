var outerRadius;
var screenScale = 0.8;
var weekScale = 0.6;

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
    
    drawWeek();
    drawDay();

    drawDateStamp();

    // d.setDate(d.getDate() + 0.2);
}

monthAngles = [
    15/(48*5),  // jan
    15/(48*5),  // feb
    15/(48*5),  // mar
    15/(48*5),  // apr
    15/(48*5),  // may
    3/24,       // jun
    3/24,       // jul
    15/(48*4),  // aug
    15/(48*4),  // sep
    15/(48*4),  // oct
    15/(48*4),  // nov
    3/24,       // dec
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
    var hour = (d.getHours() % 12).toString();
    var minute = d.getMinutes().toString().padStart(2, 0);


    noStroke();
    fill(0);
    rect(0,10, 500, 30);
    fill(255);
    textFont('monospace');
    textSize(20);
    text(d.toDateString(), 10, 30);
    text(d.toTimeString().substr(0,8), 10, 60);

    push();
    translate(window.innerWidth/2, window.innerHeight/2);
    textAlign(CENTER, CENTER);
    textSize(110);
    textFont('Helvetica');
    text(hour + ":" + minute, 0, -10);
    pop();
}

window.addEventListener('resize', function(){
    setup();
})


function drawWeek(){
    drawWeekFace();
    drawWeekHand();
}


function drawWeekFace(){
    weekRadius = weekScale * (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 2;

    push();
    // background(0);
    strokeWeight(2);
    stroke(255);
    // noFill();
    fill(0);

    translate(window.innerWidth/2, window.innerHeight/2);
    ellipse(0,0,2*weekRadius);

    y = -0.05*weekRadius;y = 0;
    x = sqrt(weekRadius*weekRadius - y*y)

    line(-x, y, x, y);
    line(0, y, 0, -weekRadius);

    rotate(-PI/2);
    m = 0.03;m=0;
    a = 6/5.0 * PI;
    line(-y,-3*m*weekRadius, weekRadius*sin(a), weekRadius*cos(a));
    a = 7/5.0 * PI;
    line(-y,-m*weekRadius, weekRadius*sin(a), weekRadius*cos(a));
    a = 8/5.0 * PI;
    line(-y,m*weekRadius, weekRadius*sin(a), weekRadius*cos(a));
    a = 9/5.0 * PI;
    line(-y,3*m*weekRadius, weekRadius*sin(a), weekRadius*cos(a));

    pop();
}

function drawWeekHand(){
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
        
        line(0,0,weekRadius, 0);

        stroke(255);
        fill(0);
        ellipse(0,0,weekRadius*1.5);
        noFill()
        ellipse(0,0,weekRadius*2);

    pop();
}

function drawDay(){
    var dayScale = .45;
    dayRadius = dayScale * (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 2;
    drawDayFace();
    drawDayHand();
}

function drawDayFace(){
    // setup();
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