import React, { useEffect, useRef } from "react";

interface LightningPath {
  x: number;
  y: number;
}

interface Lightning {
  x: number;
  y: number;
  xRange: number;
  yRange: number;
  path: LightningPath[];
  pathLimit: number;
  canSpawn: boolean;
  hasFired: boolean;
}

class CanvasLightning {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cw: number;
  private ch: number;

  private lightning: Lightning[] = [];
  private lightTimeCurrent = 0;
  private lightTimeTotal = 50;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to get 2D canvas context.");
    }

    this.ctx = context;
    this.cw = window.innerWidth;
    this.ch = window.innerHeight;

    this.resize();

    window.addEventListener("resize", this.resize);
  }

  private resize = (): void => {
    this.cw = window.innerWidth;
    this.ch = window.innerHeight;

    this.canvas.width = this.cw;
    this.canvas.height = this.ch;
  };

  private rand(min: number, max: number): number {
    return Math.floor(
      Math.random() * (max - min + 1) + min
    );
  }

  private createL(
    x: number,
    y: number,
    canSpawn: boolean
  ): void {
    this.lightning.push({
      x,
      y,
      xRange: this.rand(5, 30),
      yRange: this.rand(5, 25),
      path: [{ x, y }],
      pathLimit: this.rand(10, 35),
      canSpawn,
      hasFired: false,
    });
  }

  private updateL(): void {
    let i = this.lightning.length;

    while (i--) {
      const light = this.lightning[i];
      const lastPoint = light.path[light.path.length - 1];

      light.path.push({
        x:
          lastPoint.x +
          (this.rand(0, light.xRange) - light.xRange / 2),
        y:
          lastPoint.y +
          this.rand(0, light.yRange),
      });

      if (light.path.length > light.pathLimit) {
        this.lightning.splice(i, 1);
      }

      light.hasFired = true;
    }
  }

  private renderL(): void {
    let i = this.lightning.length;

    while (i--) {
      const light = this.lightning[i];

      this.ctx.strokeStyle = `hsla(
        0,
        100%,
        100%,
        ${this.rand(10, 100) / 100}
      )`;

      this.ctx.lineWidth = 1;

      if (this.rand(0, 30) === 0) {
        this.ctx.lineWidth = 2;
      }

      if (this.rand(0, 60) === 0) {
        this.ctx.lineWidth = 3;
      }

      if (this.rand(0, 90) === 0) {
        this.ctx.lineWidth = 4;
      }

      if (this.rand(0, 120) === 0) {
        this.ctx.lineWidth = 5;
      }

      if (this.rand(0, 150) === 0) {
        this.ctx.lineWidth = 6;
      }

      this.ctx.beginPath();
      this.ctx.moveTo(light.x, light.y);

      for (const point of light.path) {
        this.ctx.lineTo(point.x, point.y);

        if (light.canSpawn && this.rand(0, 100) === 0) {
          light.canSpawn = false;

          this.createL(
            point.x,
            point.y,
            false
          );
        }
      }

      if (!light.hasFired) {
        this.ctx.fillStyle = `rgba(
          255,
          255,
          255,
          ${this.rand(4, 12) / 100}
        )`;

        this.ctx.fillRect(
          0,
          0,
          this.cw,
          this.ch
        );
      }

      if (this.rand(0, 30) === 0) {
        this.ctx.fillStyle = `rgba(
          255,
          255,
          255,
          ${this.rand(1, 3) / 100}
        )`;

        this.ctx.fillRect(
          0,
          0,
          this.cw,
          this.ch
        );
      }

      this.ctx.stroke();
    }
  }

  private lightningTimer(): void {
    this.lightTimeCurrent++;

    if (this.lightTimeCurrent >= this.lightTimeTotal) {
      const newX = this.rand(
        100,
        this.cw - 100
      );

      const newY = this.rand(
        0,
        this.ch / 2
      );

      let createCount = this.rand(1, 3);

      while (createCount--) {
        this.createL(
          newX,
          newY,
          true
        );
      }

      this.lightTimeCurrent = 0;
      this.lightTimeTotal = this.rand(30, 100);
    }
  }

  private clearCanvas(): void {
    this.ctx.globalCompositeOperation =
      "destination-out";

    this.ctx.fillStyle = `rgba(
      0,
      0,
      0,
      ${this.rand(1, 30) / 100}
    )`;

    this.ctx.fillRect(
      0,
      0,
      this.cw,
      this.ch
    );

    this.ctx.globalCompositeOperation =
      "source-over";
  }

  private loop = (): void => {
    this.clearCanvas();
    this.updateL();
    this.lightningTimer();
    this.renderL();

    this.animationFrameId =
      window.requestAnimationFrame(this.loop);
  };

  public start(): void {
    this.loop();
  }

  public destroy(): void {
    window.removeEventListener(
      "resize",
      this.resize
    );

    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(
        this.animationFrameId
      );
    }
  }
}

const Lightning: React.FC = () => {
  const canvasRef =
    useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const lightning = new CanvasLightning(canvas);

    lightning.start();

    return () => {
      lightning.destroy();
    };
  }, []);

  return (
    <div className="page">
      <canvas
        ref={canvasRef}
        id="canvas"
      />
    </div>
  );
};

export default Lightning;
