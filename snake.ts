class Snake {
  private position: [number, number][] = [
    [5, 5],
    [4, 5],
    [3, 5],
  ];
  private direction: "up" | "down" | "left" | "right" = "right";
  private foodPosition: [number, number] = this.getRandomPosition();

  move() {
    const head = this.position[0];
    let newHead: [number, number];

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
    } else {
      this.position.pop();
    }
  }

  changeDirection(direction: "up" | "down" | "left" | "right") {
    const oppositeDirections = {
      up: "down",
      down: "up",
      left: "right",
      right: "left",
    };

    if (oppositeDirections[direction] !== this.direction) {
      this.direction = direction;
    }
  }

  private isOutOfBounds(position: [number, number]): boolean {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    return (
      position[0] < 0 ||
      position[0] >= canvas.width / 10 ||
      position[1] < 0 ||
      position[1] >= canvas.height / 10
    );
  }

  private isBitingTail(position: [number, number]): boolean {
    for (let i = 1; i < this.position.length; i++) {
      if (
        position[0] === this.position[i][0] &&
        position[1] === this.position[i][1]
      ) {
        return true;
      }
    }

    return false;
  }

  private isEatingFood(position: [number, number]): boolean {
    return (
      position[0] === this.foodPosition[0] &&
      position[1] === this.foodPosition[1]
    );
  }

  private getRandomPosition(): [number, number] {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    let x = Math.floor(Math.random() * (canvas.width / 10));
    let y = Math.floor(Math.random() * (canvas.height / 10));

    return [x, y];
  }

  private endGame() {
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
  }

  draw() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    ctx!.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    ctx!.fillStyle = "green";
    for (let i = 0; i < this.position.length; i++) {
      ctx!.fillRect(this.position[i][0] * 10, this.position[i][1] * 10, 10, 10);
    }

    // Draw the food
    ctx!.fillStyle = "red";
    ctx!.fillRect(this.foodPosition[0] * 10, this.foodPosition[1] * 10, 10, 10);
  }
}

class Game {
  private snake: Snake;
  private isPaused: boolean = false;
  private restart: HTMLButtonElement = document.getElementById(
    "startBtn"
  ) as HTMLButtonElement;
  private pause: HTMLButtonElement = document.getElementById(
    "pauseBtn"
  ) as HTMLButtonElement;

  constructor() {
    this.snake = new Snake(); // Bind event listeners
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      switch (event.keyCode) {
        case 37:
          this.snake.changeDirection("left");
          break;
        case 38:
          this.snake.changeDirection("up");
          break;
        case 39:
          this.snake.changeDirection("right");
          break;
        case 40:
          this.snake.changeDirection("down");
          break;
        case 32:
          this.togglePause();
          break;
        case 13:
          this.restartGame();
          break;
      }
    });
    this.restart.addEventListener("click", () => {
      this.restartGame();
    });
    this.pause.addEventListener("click", () => {
      this.togglePause();
    });
    // Start the game loop
    setInterval(() => {
      if (!this.isPaused) {
        this.snake.move();
        this.snake.draw();
      }
    }, 100);
  }

  private togglePause() {
    this.isPaused = !this.isPaused;
  }

  private restartGame() {
    this.snake = new Snake();
  }
}
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
