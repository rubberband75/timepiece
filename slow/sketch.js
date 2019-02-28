var dayRadius;
var screenScale = 0.8;

var d = new Date();

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    strokeWeight(2);
    stroke(255);
    noFill();

    textFont('Montserrat');
}


function draw() {
    d = new Date();

    dayRadius = screenScale * (window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth) / 2;

    drawSlowFace();
    drawDayHand();


}

function drawSlowFace() {
    push();
    translate(window.innerWidth / 2, window.innerHeight / 2);
    stroke(255);
    // noFill()
    fill(30);
    strokeWeight(1);
    ellipse(0, 0, dayRadius * 2.02);



    push();
    stroke(255);
    var ticks = 24 * 4;
    for (var i = 0; i < ticks; i++) {
        rotate(PI / ticks * 2);
        if ((i+1) % 4 != 0) {
            line(dayRadius * 0.95, 0, dayRadius * 0.98, 0);
        }
    }
    pop();



    push();
    stroke(255);
    var ticks = 24;
    for (var i = 0; i < ticks; i++) {
        rotate(PI / ticks * 2);
        line(dayRadius * 0.85, 0, dayRadius * 0.93, 0);
    }
    pop();


    push();
    stroke(255);
    var ticks = 24;
    for (var i = 0; i < ticks; i++) {
        rotate(PI / ticks * 2);

        push();
        translate(dayRadius * 0.97, 0);
        rotate(PI / 2);
        noStroke();
        fill(150);
        textAlign(CENTER, CENTER);
        textSize(dayRadius * 0.05);
        // textFont('sans-serif');
        var n2 = ((i + 18) % 12 + 1).toString().padStart(1, '0');
        text(n2, 0, 0);
        pop();

        if (i % 2 != 0) {

            push();
            noStroke();
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(dayRadius * 0.13);

            translate(dayRadius * 0.75, 0);
            rotate((-2 * PI / ticks) * i - (PI / ticks * 2));

            var n = ((i + 19) % 24).toString().padStart(2, '0');
            text(n, 0, 0)

            pop();
        }
    }
    pop();

    pop();
}

function drawDayHand() {
    push();
    stroke(255, 0, 0);
    translate(window.innerWidth / 2, window.innerHeight / 2);
    rotate(PI / 2);

    //rotate to angle of hour
    var secondAngle = map((d.getHours()) * 60 * 60 + (d.getMinutes()) * 60 + (d.getSeconds()), 0, 60 * 60 * 24, 0, 2 * PI);

    rotate(secondAngle)

    // line(0,0,dayRadius, 0);


    stroke(200);
    strokeWeight(1);
    fill(210);

    ellipse(0, 0, dayRadius / 8);
    triangle(-dayRadius / 6, dayRadius / 40,
        dayRadius, 0,
        -dayRadius / 6, -dayRadius / 40);
    ellipse(0, 0, dayRadius / 8);

    pop();
}


window.addEventListener('resize', function () {
    setup();
})