import Particles from "react-tsparticles";
import React, { useEffect, useState, useCallback } from "react";
import { loadFull } from "tsparticles";
import { polygonPathName, loadPolygonPath } from "tsparticles-path-polygon";

const HomeParticles = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadPolygonPath(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Particles
      className="particles"
      id="tsparticles1"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 60,
        particles: {
          color: {
            value: "#1985A1",
          },
          move: {
            attract: {
              enable: true,
              rotate: {
                distance: 100,
                x: windowDimensions.width,
                y: windowDimensions.height,
              },
            },
            direction: "none",
            enable: true,
            outModes: {
              default: "destroy",
            },
            path: {
              clamp: false,
              enable: true,
              delay: {
                value: 0,
              },
              generator: polygonPathName,
              options: {
                sides: 6,
                turnSteps: 30,
                angle: 30,
              },
            },
            random: false,
            speed: 3,
            straight: true,
            trail: {
              fillColor: "#000",
              length: 20,
              enable: true,
            },
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 0,
          },

          shape: {
            type: "circle",
          },
          size: {
            value: 2,
          },
        },
        background: {
          color: { value: "#000" },
        },
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        detectRetina: true,
        emitters: {
          direction: "none",
          rate: {
            quantity: 1,
            delay: 0.25,
          },
          size: {
            width: 0,
            height: 0,
          },
          position: {
            x: 50,
            y: 50,
          },
        },
      }}
    />
  );
};
export default HomeParticles;
