var Snake = /** @class */ (function () {
    function Snake() {
        this.position = [
            [5, 5],
            [4, 5],
            [3, 5],
        ];
        this.direction = "right";
        this.foodPosition = this.getRandomPosition();
    }
    Snake.prototype.move = function () {
        var head = this.position[0];
        var newHead;
        switch (this.direction) {
            case "up":
                newHead = [head[0], head[1] - 1];
                break;
            case "down":
                newHead = [head[0], head[1] + 1];
                break;
            case "left":
                newHead = [head[0] - 1, head[1]];
                break;
            case "right":
                newHead = [head[0] + 1, head[1]];
                break;
        }
        if (this.isOutOfBounds(newHead) || this.isBitingTail(newHead)) {
            this.endGame();
            return;
        }
        this.position.unshift(newHead);
        if (this.isEatingFood(newHead)) {
            this.foodPosition = this.getRandomPosition();
        }
        else {
            this.position.pop();
        }
    };
    Snake.prototype.changeDirection = function (direction) {
        var oppositeDirections = {
            up: "down",
            down: "up",
            left: "right",
            right: "left"
        };
        if (oppositeDirections[direction] !== this.direction) {
            this.direction = direction;
        }
    };
    Snake.prototype.isOutOfBounds = function (position) {
        var canvas = document.getElementById("canvas");
        return (position[0] < 0 ||
            position[0] >= canvas.width / 10 ||
            position[1] < 0 ||
            position[1] >= canvas.height / 10);
    };
    Snake.prototype.isBitingTail = function (position) {
        for (var i = 1; i < this.position.length; i++) {
            if (position[0] === this.position[i][0] &&
                position[1] === this.position[i][1]) {
                return true;
            }
        }
        return false;
    };
    Snake.prototype.isEatingFood = function (position) {
        return (position[0] === this.foodPosition[0] &&
            position[1] === this.foodPosition[1]);
    };
    Snake.prototype.getRandomPosition = function () {
        var canvas = document.getElementById("canvas");
        var x = Math.floor(Math.random() * (canvas.width / 10));
        var y = Math.floor(Math.random() * (canvas.height / 10));
        return [x, y];
    };
    Snake.prototype.endGame = function () {
        // Game over animation
        // ...
        // Restart the game
        this.position = [
            [5, 5],
            [4, 5],
            [3, 5],
        ];
        this.direction = "right";
        this.foodPosition = this.getRandomPosition();
    };
    Snake.prototype.draw = function () {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw the snake
        ctx.fillStyle = "green";
        for (var i = 0; i < this.position.length; i++) {
            ctx.fillRect(this.position[i][0] * 10, this.position[i][1] * 10, 10, 10);
        }
        // Draw the food
        ctx.fillStyle = "red";
        ctx.fillRect(this.foodPosition[0] * 10, this.foodPosition[1] * 10, 10, 10);
    };
    return Snake;
}());
var Game = /** @class */ (function () {
    function Game() {
        var _this = this;
        this.isPaused = false;
        this.restart = document.getElementById("startBtn");
        this.pause = document.getElementById("pauseBtn");
        this.snake = new Snake(); // Bind event listeners
        document.addEventListener("keydown", function (event) {
            switch (event.keyCode) {
                case 37:
                    _this.snake.changeDirection("left");
                    break;
                case 38:
                    _this.snake.changeDirection("up");
                    break;
                case 39:
                    _this.snake.changeDirection("right");
                    break;
                case 40:
                    _this.snake.changeDirection("down");
                    break;
                case 32:
                    _this.togglePause();
                    break;
                case 13:
                    _this.restartGame();
                    break;
            }
        });
        this.restart.addEventListener("click", function () {
            _this.restartGame();
        });
        this.pause.addEventListener("click", function () {
            _this.togglePause();
        });
        // Start the game loop
        setInterval(function () {
            if (!_this.isPaused) {
                _this.snake.move();
                _this.snake.draw();
            }
        }, 100);
    }
    Game.prototype.togglePause = function () {
        this.isPaused = !this.isPaused;
    };
    Game.prototype.restartGame = function () {
        this.snake = new Snake();
    };
    return Game;
}());
// const start = document.getElementById("startBtn") as HTMLButtonElement;
// start.addEventListener("click", () => {
//   restartGame();
// });
// const pause = document.getElementById("pauseBtn") as HTMLButtonElement;
// pause.addEventListener("click", () => {
//   // togglePause();
// });
// Start the game
new Game();
