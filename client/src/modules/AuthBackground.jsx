import React, { useEffect, useRef, useState } from "react";
import "../styles/auth.css";
import { Outlet } from "react-router-dom";

const TWO_PI = Math.PI * 2;

class Petal {
  constructor(x, y, size) {
    this.position = { x, y };
    this.size = size;
    this.angle = Math.random() * TWO_PI;
    this.speed = Math.random() * 1 + 0.5; // Random speed
    this.windEffect = (Math.random() * 0.7 - 0.25); // Random wind effect
    this.rotation = Math.random() * TWO_PI;
    this.rotationSpeed = Math.random() * 0.02 - 0.01; // Rotation speed
  }

  update() {
    // Update position with wind effect and speed
    this.position.y += this.speed;
    this.position.x += this.windEffect;

    // Rotate the petal
    this.rotation += this.rotationSpeed;

    // Reset position if the petal falls out of view
    if (this.position.y > window.innerHeight) {
      this.position.y = -this.size; // Reset to the top
      this.position.x = Math.random() * window.innerWidth; // Random x position
    }
  }

  render(context) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.fillStyle = "rgba(255, 182, 193, 0.8)";
    context.beginPath();
    context.moveTo(0, -this.size);
    context.quadraticCurveTo(this.size / 2, -this.size / 2, 0, 0);
    context.quadraticCurveTo(-this.size / 2, -this.size / 2, 0, -this.size);
    context.fill();
    context.restore();
  }
}

class PetalContainer {
  constructor(context, petalCount) {
    this.context = context;
    this.petalCount = petalCount; // Number of petals
    this.petals = [];
    this.initializePetals();
  }

  initializePetals() {
    for (let i = 0; i < this.petalCount; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 15 + 5; // Size range from 5 to 15
      this.petals.push(new Petal(x, y, size));
    }
  }

  update() {
    this.petals.forEach((petal) => petal.update());
  }

  render() {
    this.petals.forEach((petal) => petal.render(this.context));
  }

  resize() {
    // When the canvas resizes, reset petal positions
    this.petals.forEach((petal) => {
      petal.position.x = Math.random() * window.innerWidth;
      petal.position.y = Math.random() * window.innerHeight;
    });
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
  const [petalContainer, setPetalContainer] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Create the petal container
    const newPetalContainer = new PetalContainer(context, 500);
    setPetalContainer(newPetalContainer);

    const update = () => {
      newPetalContainer.update();
    };

    const render = () => {
      context.clearRect(0, 0, dimensions.width, dimensions.height);
      newPetalContainer.render();
    };

    const loop = () => {
      update();
      render();
      requestRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [dimensions]); // Update only on dimensions changes

  useEffect(() => {
    const handleResize = debounce(() => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if (newWidth !== dimensions.width || newHeight !== dimensions.height) {
        setDimensions({ width: newWidth, height: newHeight });

        // Update canvas size and petal positions
        if (petalContainer) {
          petalContainer.resize();
        }
      }
    }, 150);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dimensions, petalContainer]);

  return (
    <>
      <Outlet />
      <div className="background">
        <canvas ref={canvasRef} id="canvas">
          Your browser doesn't support canvas
        </canvas>
      </div>
    </>
  );
};

export default CanvasAnimation;
