// Inisialisasi variabel
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20; // Skala pixel untuk satu kotak
const rows = canvas.height / scale;
const columns = canvas.width / scale;
let snake;
let fruit;
let gameInterval;
let score = 0; // Skor awal

// Mendapatkan elemen tombol dari HTML
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const scoreElement = document.getElementById('score');

// Menambahkan event listener untuk tombol start
startButton.addEventListener('click', startGame);

// Menambahkan event listener untuk tombol stop
stopButton.addEventListener('click', stopGame);

// Menambahkan event listener untuk kontrol keyboard
window.addEventListener('keydown', evt => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
});

function startGame() {
    // Menghentikan interval game jika sudah berjalan sebelumnya
    clearInterval(gameInterval);

    // Inisialisasi ulang permainan
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    // Memulai interval game
    gameInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
            score++; // Menambah skor saat ular memakan buah
            scoreElement.textContent = score; // Memperbarui tampilan skor
        }

        snake.checkCollision();

    }, 100); // Mengurangi interval menjadi 100ms untuk responsivitas yang lebih baik
}

function stopGame() {
    // Menghentikan interval game
    clearInterval(gameInterval);
}

// Kelas untuk Ular dan Buah (seperti sebelumnya)

// Kelas untuk Ular dan Buah (seperti sebelumnya)



// Kelas untuk Ular
class Snake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.xSpeed = scale * 1;
        this.ySpeed = 0;
        this.total = 0;
        this.tail = [];
    }

    draw() {
        ctx.fillStyle = "#4CAF50";
        for (let i=0; i<this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        ctx.fillRect(this.x, this.y, scale, scale);
    }

    update() {
        for (let i=0; i<this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.x >= canvas.width) {
            this.x = 0;
        }

        if (this.y >= canvas.height) {
            this.y = 0;
        }

        if (this.x < 0) {
            this.x = canvas.width - scale;
        }

        if (this.y < 0) {
            this.y = canvas.height - scale;
        }
    }

    changeDirection(direction) {
        switch(direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale * 1;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale * 1;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale * 1;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale * 1;
                    this.ySpeed = 0;
                }
                break;
        }
    }

    eat(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        return false;
    }

    checkCollision() {
        for (let i=0; i<this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.total = 0;
                this.tail = [];
            }
        }
    }
}

// Kelas untuk Buah
class Fruit {
    constructor() {
        this.x;
        this.y;
    }

    pickLocation() {
        this.x = Math.floor(Math.random() * columns) * scale;
        this.y = Math.floor(Math.random() * rows) * scale;
    }

    draw() {
        ctx.fillStyle = "#FF5733";
        ctx.beginPath();
        ctx.arc(this.x + scale / 2, this.y + scale / 2, scale / 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}


// Mengatur interval game dengan nilai yang lebih kecil untuk responsivitas yang lebih baik
gameInterval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {
        fruit.pickLocation();
    }

    snake.checkCollision();
    document.querySelector('.score').innerText = snake.total;

}, 100); // Mengurangi interval menjadi 100ms untuk responsivitas yang lebih baik
