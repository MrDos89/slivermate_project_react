import { useEffect, useRef } from "react";

const FireworksCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const colors = ["#ffffff", "#ffff66"];
    let particles = [];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = Math.random() * 2 + 1;
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * 5 + 2;
        this.life = 60;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life--;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const triggerFirework = () => {
      let x, y;
      do {
        x = Math.random() * width;
        y = Math.random() * height * 0.5;
        // 중앙 30% 영역 피하기
      } while (
        x > width * 0.35 &&
        x < width * 0.65 &&
        y > height * 0.2 &&
        y < height * 0.4
      );
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height); // 잔상 없이 지움
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(index, 1);
      });
      requestAnimationFrame(animate);
    };

    // 즉시 4개 폭죽 터뜨림
    for (let i = 0; i < 4; i++) {
      triggerFirework();
    }

    // 이후 랜덤 반복
    const fireworkIntervals = Array(4)
      .fill()
      .map(() =>
        setInterval(() => {
          triggerFirework();
        }, Math.random() * 3000 + 1000)
      );

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      fireworkIntervals.forEach((id) => clearInterval(id));
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1, // 텍스트보다 위
        pointerEvents: "none", // 클릭 막지 않음
      }}
    />
  );
};

export default FireworksCanvas;
