const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d', { willReadFrequently: true });

const flowers = [];
const colors = ['blue', 'green', 'red', 'yellow', 'cyan', 'orange', 'pink', 'lightgray', 'purple'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function initFlowers() {
    for (let i = 1; i <= 80; i++) {
        const flower = {
            x: getRandomInt(0, 300),
            y: getRandomInt(-150, 0),
            phase1: [[0,-4],[-3,-3],[0,-3],[3,-3],[-2,-2],[0,-2],[2,-2],[-1,-1],[0,-1],[1,-1],[-4,0],[-3,0],[-2,0],[-1,0],[1,0],[2,0],[3,0],[4,0],[-1,1],[0,1],[1,1],[-2,2],[0,2],[2,2],[-3,3],[0,3],[3,3],[0,4]],
            phase2: [[1,-4],[-2,-3],[0,-3],[-2,-2],[0,-2],[2,-2],[3,-2],[-4,-1],[-1,-1],[0,-1],[1,-1],[-3,0],[-2,0],[-1,0],[1,0],[2,0],[3,0],[-1,1],[0,1],[1,1],[4,1],[-3,2],[-2,2],[0,2],[2,2],[0,3],[2,3],[-1,4]],
            phase3: [[-2,-4],[2,-4],[-1,-3],[1,-3],[-4,-2],[-2,-2],[0,-2],[2,-2],[4,-2],[-3,-1],[-2,-1],[-1,-1],[0,-1],[1,-1],[2,-1],[3,-1],[-1,0],[1,0],[-3,1],[-2,1],[-1,1],[0,1],[1,1],[2,1],[3,1],[-4,2],[-1,2],[1,2],[4,2],[-1,3],[1,3],[-2,4],[2,4]],
            phase4: [[-1,-4],[0,-3],[2,-3],[-3,-2],[-2,-2],[0,-2],[2,-2],[-1,-1],[0,-1],[1,-1],[4,-1],[-3,0],[-2,0],[-1,0],[1,0],[2,0],[3,0],[-4,1],[-1,1],[0,1],[1,1],[-2,2],[0,2],[2,2],[3,2],[-2,3],[0,3],[1,4]],
            currentPhase: 1,
            color: Math.floor(Math.random() * colors.length),
            rotation: getRandomInt(0, 1)
        };
        flower.x0 = flower.x;
        flowers.push(flower);
    }
}

function moveFlower(flower) {
    flower.y += 1;
    if (flower.y > 160) {
        flower.x = getRandomInt(0, 300);
        flower.y = getRandomInt(-50, 0);
        flower.color = Math.floor(Math.random() * colors.length);
    }
    flower.x = flower.x0 + Math.floor(Math.sin(flower.y) * 2);
}

function render() {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    flowers.forEach(flower => {
        ctx.fillStyle = colors[flower.color];
        if (flower.currentPhase == 4) {
            flower.phase4.forEach(e => {
                ctx.fillRect(flower.x + e[0], flower.y + e[1], 1, 1);
            });
            if (flower.rotation) {
                flower.currentPhase--;
            }
            else {
                flower.currentPhase = 1;
            }
        }
        else if (flower.currentPhase == 3) {
            flower.phase3.forEach(e => {
                ctx.fillRect(flower.x + e[0], flower.y + e[1], 1, 1);
            });
            if (flower.rotation) {
                flower.currentPhase--;
            }
            else {
                flower.currentPhase++;
            }
        }
        else if (flower.currentPhase == 2) {
            flower.phase2.forEach(e => {
                ctx.fillRect(flower.x + e[0], flower.y + e[1], 1, 1);
            });
            if (flower.rotation) {
                flower.currentPhase--;
            }
            else {
                flower.currentPhase++;
            }
        }
        else {
            flower.phase1.forEach(e => {
                ctx.fillRect(flower.x + e[0], flower.y + e[1], 1, 1);
            });
            if (flower.rotation) {
                flower.currentPhase = 4;
            }
            else {
                flower.currentPhase++;
            }
        }
        ctx.fillStyle = 'yellow';
        ctx.fillRect(flower.x, flower.y, 1, 1);
        moveFlower(flower);
    });
}

initFlowers();
const run = setInterval(render, 80);