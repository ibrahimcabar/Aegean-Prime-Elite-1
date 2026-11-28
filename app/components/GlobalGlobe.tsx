
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function GlobalGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      1,
      0.1,
      100
    );

    camera.position.set(0, 0, 6.4);

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.75)
    );

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.cursor = "grab";

    const globe = new THREE.Group();
    scene.add(globe);

    const radius = 1.65;

    const ambient = new THREE.AmbientLight(
      0xffffff,
      1.6
    );

    scene.add(ambient);

    const light = new THREE.DirectionalLight(
      0xffe1a3,
      3.2
    );

    light.position.set(4, 3, 5);
    scene.add(light);

    const rimLight = new THREE.DirectionalLight(
      0xb99a62,
      1.8
    );

    rimLight.position.set(-4, 1, -3);
    scene.add(rimLight);

    const earthGeometry = new THREE.SphereGeometry(
      radius,
      64,
      48
    );

    const earthMaterial = new THREE.MeshStandardMaterial({
      color: 0x29241b,
      roughness: 0.75,
      metalness: 0.35,
    });

    const earth = new THREE.Mesh(
      earthGeometry,
      earthMaterial
    );

    globe.add(earth);

    let disposed = false;

    const loader = new THREE.TextureLoader();

    loader.load(
      "https://cdn.jsdelivr.net/npm/three-globe@2.31.0/example/img/earth-night.jpg",
      (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }

        const canvas = document.createElement("canvas");

        canvas.width = 2048;
        canvas.height = 1024;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          texture.dispose();
          return;
        }

        try {
          ctx.drawImage(
            texture.image,
            0,
            0,
            canvas.width,
            canvas.height
          );

          const image = ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );

          const data = image.data;

          for (let i = 0; i < data.length; i += 4) {
            const brightness =
              data[i] * 0.299 +
              data[i + 1] * 0.587 +
              data[i + 2] * 0.114;

            const value = Math.min(
  1,
  Math.pow(brightness / 255, 0.40) * 1.35
);

data[i] = 3 + value * 252;
data[i + 1] = 5 + value * 205;
data[i + 2] = 8 + value * 115;
          }

          ctx.putImageData(image, 0, 0);

          const goldTexture =
            new THREE.CanvasTexture(canvas);

          goldTexture.colorSpace =
            THREE.SRGBColorSpace;

          goldTexture.anisotropy = Math.min(
            8,
            renderer.capabilities.getMaxAnisotropy()
          );

          earthMaterial.color.set(0xffffff);
          earthMaterial.map = goldTexture;
          earthMaterial.emissive.set(0x6b4819);
          earthMaterial.emissiveMap = goldTexture;
          earthMaterial.emissiveIntensity = 0.85;
          earthMaterial.needsUpdate = true;
        } catch {
          setFailed(true);
        } finally {
          texture.dispose();
        }
      },
      undefined,
      () => {
        if (!disposed) setFailed(true);
      }
    );

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(
        radius * 1.045,
        48,
        32
      ),
      new THREE.ShaderMaterial({
        uniforms: {
          glowColor: {
            value: new THREE.Color(0xc9a45e),
          },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            vec4 mvPosition =
              modelViewMatrix * vec4(position, 1.0);
            vNormal = normalize(normalMatrix * normal);
            vView = normalize(-mvPosition.xyz);
            gl_Position =
              projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          varying vec3 vNormal;
          varying vec3 vView;
          void main() {
            float intensity = pow(
              1.0 - abs(dot(
                normalize(vNormal),
                normalize(vView)
              )),
              3.0
            );
            gl_FragColor = vec4(
              glowColor,
              intensity * 0.55
            );
          }
        `,
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );

    globe.add(atmosphere);

    function positionFromLatLng(
      lat: number,
      lng: number,
      r: number
    ) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lng + 180) * Math.PI / 180;

      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    }

    const cities = [
  { name: "Istanbul", lat: 41.0082, lng: 28.9784 },
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "Vienna", lat: 48.2082, lng: 16.3738 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
];

    const gold = new THREE.Color(0xffcf78);

    const markerGeometry =
      new THREE.SphereGeometry(0.025, 12, 12);

    const markerMaterial =
      new THREE.MeshBasicMaterial({
        color: gold,
      });

    const glowCanvas =
      document.createElement("canvas");

    glowCanvas.width = 64;
    glowCanvas.height = 64;

    const glowCtx = glowCanvas.getContext("2d");

    if (glowCtx) {
      const gradient =
        glowCtx.createRadialGradient(
          32, 32, 0,
          32, 32, 32
        );

      gradient.addColorStop(0, "#fff2bd");
      gradient.addColorStop(0.2, "#e8b95c");
      gradient.addColorStop(1, "rgba(232,185,92,0)");

      glowCtx.fillStyle = gradient;
      glowCtx.fillRect(0, 0, 64, 64);
    }

    const glowTexture =
      new THREE.CanvasTexture(glowCanvas);

    cities.forEach((city) => {
      const marker = new THREE.Mesh(
        markerGeometry,
        markerMaterial
      );

      marker.position.copy(
        positionFromLatLng(
          city.lat,
          city.lng,
          radius + 0.025
        )
      );

      globe.add(marker);

      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: glowTexture,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        })
      );

      sprite.position.copy(marker.position);
      sprite.scale.set(0.26, 0.26, 1);

      globe.add(sprite);
      const labelCanvas = document.createElement("canvas");
labelCanvas.width = 512;
labelCanvas.height = 128;

const labelCtx = labelCanvas.getContext("2d");

if (labelCtx) {
  labelCtx.font = "600 42px Arial";
  labelCtx.textAlign = "center";
  labelCtx.textBaseline = "middle";

  labelCtx.shadowColor = "#000000";
  labelCtx.shadowBlur = 10;
  labelCtx.fillStyle = "#ffe0a3";

  labelCtx.fillText(city.name, 256, 64);

  const labelTexture = new THREE.CanvasTexture(labelCanvas);
  labelTexture.colorSpace = THREE.SRGBColorSpace;

  const label = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: labelTexture,
      transparent: true,
      depthTest: true,
      depthWrite: false,
    })
  );

  label.position.copy(
    positionFromLatLng(
      city.lat,
      city.lng,
      radius + 0.13
    )
  );

  label.scale.set(0.85, 0.2125, 1);

  globe.add(label);
}
    });

    const routes: {
      points: THREE.Vector3[];
      pulse: THREE.Mesh;
      offset: number;
    }[] = [];

    const origin = cities[0];

    cities.slice(1).forEach((city, index) => {
      const a = positionFromLatLng(
        origin.lat,
        origin.lng,
        1
      ).normalize();

      const b = positionFromLatLng(
        city.lat,
        city.lng,
        1
      ).normalize();

      const angle = a.angleTo(b);
      const points: THREE.Vector3[] = [];

      for (let i = 0; i <= 80; i++) {
        const t = i / 80;

        const direction =
          a.clone()
            .multiplyScalar(
              Math.sin((1 - t) * angle) /
              Math.sin(angle)
            )
            .add(
              b.clone().multiplyScalar(
                Math.sin(t * angle) /
                Math.sin(angle)
              )
            )
            .normalize();

        const altitude =
          Math.sin(Math.PI * t) *
          (0.08 + angle * 0.18);

        points.push(
          direction.multiplyScalar(
            radius + 0.025 + altitude
          )
        );
      }

      const geometry =
        new THREE.BufferGeometry().setFromPoints(
          points
        );

      const line = new THREE.Line(
        geometry,
        new THREE.LineBasicMaterial({
  color: 0xffd580,
  transparent: true,
  opacity: 1,
})
      );

      globe.add(line);

      const pulse = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 10, 10),
        new THREE.MeshBasicMaterial({
          color: 0xfff0c4,
        })
      );

      globe.add(pulse);

      routes.push({
        points,
        pulse,
        offset: index * 0.24,
      });
    });

    globe.rotation.y = -2.05;
globe.rotation.x = 0.60;

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    const resizeObserver =
      new ResizeObserver(resize);

    resizeObserver.observe(container);
    resize();

    let dragging = false;
    let previousX = 0;
    let previousY = 0;

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      previousX = event.clientX;
      previousY = event.clientY;

      renderer.domElement.setPointerCapture(
        event.pointerId
      );

      renderer.domElement.style.cursor = "grabbing";
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!dragging) return;

      const dx = event.clientX - previousX;
      const dy = event.clientY - previousY;

      globe.rotation.y += dx * 0.007;

      globe.rotation.x = Math.max(
        -0.65,
        Math.min(
          0.65,
          globe.rotation.x + dy * 0.004
        )
      );

      previousX = event.clientX;
      previousY = event.clientY;
    };

    const onPointerUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
    };

    const canvas = renderer.domElement;

    canvas.addEventListener(
      "pointerdown",
      onPointerDown
    );

    canvas.addEventListener(
      "pointermove",
      onPointerMove
    );

    canvas.addEventListener(
      "pointerup",
      onPointerUp
    );

    canvas.addEventListener(
      "pointercancel",
      onPointerUp
    );

    canvas.addEventListener(
      "lostpointercapture",
      onPointerUp
    );

    let visible = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      }
    );

    observer.observe(container);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;

    const animate = (time: number) => {
      frame = requestAnimationFrame(animate);

      const delta = previousTime
        ? Math.min((time - previousTime) / 1000, 0.05)
        : 0;

      previousTime = time;

      if (!visible || document.hidden) return;

      if (!reducedMotion) {
        elapsed += delta;

        if (!dragging) {
          globe.rotation.y += delta * 0.12;
        }
      }

      routes.forEach(({ points, pulse, offset }) => {
        const progress =
          (elapsed * 0.3 + offset) % 1;

        const position =
          progress * (points.length - 1);

        const index = Math.floor(position);

        pulse.position
          .copy(points[index])
          .lerp(
            points[Math.min(index + 1, points.length - 1)],
            position - index
          );
      });

      renderer.render(scene, camera);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      disposed = true;

      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();

      canvas.removeEventListener(
        "pointerdown",
        onPointerDown
      );

      canvas.removeEventListener(
        "pointermove",
        onPointerMove
      );

      canvas.removeEventListener(
        "pointerup",
        onPointerUp
      );

      canvas.removeEventListener(
        "pointercancel",
        onPointerUp
      );

      canvas.removeEventListener(
        "lostpointercapture",
        onPointerUp
      );

      const geometries =
        new Set<THREE.BufferGeometry>();

      const materials =
        new Set<THREE.Material>();

      const textures =
        new Set<THREE.Texture>();

      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line
        ) {
          geometries.add(object.geometry);
        }

        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Sprite
        ) {
          const list = Array.isArray(object.material)
            ? object.material
            : [object.material];

          list.forEach((material) => {
            materials.add(material);

            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) {
                textures.add(value);
              }
            });
          });
        }
      });

      textures.add(glowTexture);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());

      renderer.dispose();

      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div className="velora-global-globe">
      <div
        ref={containerRef}
        className="velora-globe-canvas"
        aria-hidden="true"
      />

      {failed && (
        <div className="velora-globe-fallback">
          <svg
            viewBox="0 0 200 200"
            width="210"
            height="210"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <circle cx="100" cy="100" r="82" />
            <ellipse
              cx="100"
              cy="100"
              rx="40"
              ry="82"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="82"
              ry="40"
            />
            <path d="M18 100H182 M100 18V182" />
          </svg>
        </div>
      )}

      <style jsx>{`
        .velora-global-globe {
          position: relative;
          width: 100%;
          max-width: 540px;
          margin: 0 auto;
          background: radial-gradient(
            ellipse at center,
            rgba(185, 154, 98, 0.09),
            transparent 65%
          );
        }

        .velora-globe-canvas {
          width: 100%;
          height: 440px;
        }

        .velora-globe-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c9aa72;
          background: #101210;
          pointer-events: none;
        }

        @media (max-width: 600px) {
          .velora-globe-canvas {
            height: 340px;
          }
        }

        @media (max-width: 380px) {
          .velora-globe-canvas {
            height: 290px;
          }
        }
      `}</style>
    </div>
  );
}
