let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let dinoImg = new Image();
dinoImg.src = 'dinosaur.png';

let dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.drawImage(dinoImg, this.x, this.y);
    },
    jump() {
        this.y -= 2;
    },
    fall() {
        if(this.y < 200) {
            this.y += 2
        }
    }
}

let cactusImg = new Image();
cactusImg.src = 'cactus.png';

class Cactus {
    constructor() {
        this.x = 600;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(cactusImg, this.x, this.y);
    }
}

let timer = 0;
let cactus여러개 = [];
let animate;
let 점프timer = 0;
let 점프 = false;

function 프레임마다실행(){
    animate = requestAnimationFrame(프레임마다실행);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(timer % 180 == 0) {
        let cactus = new Cactus();
        cactus여러개.push(cactus);
    }
    timer++;

    cactus여러개.forEach((a, i, object)=>{
        if(a.x < 0) {
            object.splice(i, 1);
        }

        a.x -= 2;
        a.draw();
        충돌여부(dino, a);
    })

    if(점프) {
        dino.jump();
        점프timer++;
    } else if (!점프) {
        점프timer = 0;
        dino.fall()
    }

    if(점프timer > 60) {
        점프 = false;
    }

    dino.draw();
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

프레임마다실행();

function 충돌여부(dino,cactus){
    let x축차이 = cactus.x - (dino.x + dino.width) < 0 ? true : false;
    let y축차이 = cactus.y - (dino.y + dino.height) < 0 ? true : false;

    if(x축차이 && y축차이) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animate);
    }
}

document.addEventListener('keydown', function(e) {
    if(e.code === 'Space') {
        점프 = true;
    }
})
