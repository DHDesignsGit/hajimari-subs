import React, { useEffect, useRef, useState } from "react";
import "../styles/auth.css";
import { Outlet } from "react-router-dom";

const TWO_PI = Math.PI * 2;

class Circle {
  constructor(x, y, baseRadius, bounceRadius, angleCircle) {
    this.basePosition = { x, y };
    this.position = { x, y };
    this.speed = 0.01;
    this.baseSize = 10;
    this.size = 10;
    this.angle = x + y;
    this.baseRadius = baseRadius;
    this.bounceRadius = bounceRadius;
    this.angleCircle = angleCircle;
  }

  update() {
    this.position.x =
      this.basePosition.x +
      Math.cos(this.angleCircle) *
        (Math.sin(this.angle + this.angleCircle) * this.bounceRadius +
          this.baseRadius);
    this.position.y =
      this.basePosition.y +
      Math.sin(this.angleCircle) *
        (Math.sin(this.angle + this.angleCircle) * this.bounceRadius +
          this.baseRadius);
    this.size = Math.cos(this.angle) * 8 + this.baseSize;

    this.angle += this.speed;
  }

  render(context) {
    context.fillStyle = `hsl(195, 100%, ${this.size * 4}%)`;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, TWO_PI);
    context.fill();
  }
}

class CircleContainer {
  constructor(context, x, y) {
    this.context = context;
    this.position = { x, y };
    this.numberOfCircles = 19;
    this.circles = [];
    this.baseRadius = 20;
    this.bounceRadius = 150;
    this.singleSlice = TWO_PI / this.numberOfCircles;
    this.initializeCircles();
  }

  initializeCircles() {
    for (let i = 0; i < this.numberOfCircles; i++) {
      this.circles.push(
        new Circle(
          this.position.x,
          this.position.y + Math.random(),
          this.baseRadius,
          this.bounceRadius,
          i * this.singleSlice
        )
      );
    }
  }

  update() {
    this.circles.forEach((circle) => circle.update());
  }

  render() {
    this.circles.forEach((circle) => circle.render(this.context));
  }
}

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const CanvasAnimation = () => {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let { width, height } = dimensions;
    canvas.width = width;
    canvas.height = height;

    const circleContainers = [];

    const initializeCircleContainers = () => {
      circleContainers.length = 0;
      for (let x = 0; x < width + 100; x += 100) {
        for (let y = 0; y < height + 100; y += 100) {
          let circleContainer = new CircleContainer(context, x, y);
          circleContainers.push(circleContainer);
        }
      }
    };

    const update = () => {
      circleContainers.forEach((container) => container.update());
    };

    const render = () => {
      context.clearRect(0, 0, width, height);
      circleContainers.forEach((container) => container.render());
    };

    const loop = () => {
      update();
      render();
      requestRef.current = requestAnimationFrame(loop);
    };

    initializeCircleContainers();
    loop();

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions]);

  useEffect(() => {
    const handleResize = debounce(() => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        setDimensions({ width: newWidth, height: newHeight });
      }
    }, 150);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dimensions]);

  return (
    <>
      <Outlet />
      <div className="background">
      <canvas ref={canvasRef} id="canvas">
        Your browser doesn't support canvas
      </canvas>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" mode="normal" result="mix" />
            <feDropShadow dx="1" dy="1" stdDeviation="3" floodColor="black" />
          </filter>
        </defs>
      </svg>
      </div>
    </>
  );
};

export default CanvasAnimation;
