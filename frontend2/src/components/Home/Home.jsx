import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { Link } from "react-router-dom";

export default function AnimatedHomePage() {
  const [show, setShow] = useState(false);

  // Define animations
  const textAnimation = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(20px)",
    config: { duration: 800 },
  });

  const imageAnimation = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? "translateX(0)" : "translateX(-20px)",
    config: { duration: 800 },
  });

  // Set show to true after a delay to trigger animations
  setTimeout(() => setShow(true), 200);

  return (
    <div className="w-full mx-auto max-w-7xl">
      <section className="flex flex-col-reverse items-center justify-between px-4 py-12 lg:flex-row sm:px-6 lg:px-8 lg:py-24">
        <animated.div style={textAnimation} className="max-w-xl lg:mr-12">
          <h2 className="text-4xl font-bold lg:text-7xl">
            Smart-Bin
            <span className="block text-4xl lg:hidden">Lorem Ipsum</span>
          </h2>
          <div>
            <p className="mt-4 text-lg lg:text-3xl lg:mt-6">
              "Smart bins, powered by IoT, streamline waste management with
              sensors and connectivity. They optimize collection routes, monitor
              fill levels, and cut costs, all while promoting sustainability."
            </p>
          </div>
        </animated.div>
        <animated.div style={imageAnimation} className="mt-10 lg:w-2/5 lg:mt-0">
          <img
            className="w-full rounded-lg "
            src="src/components/Home/smartbin.jpg"
            alt="Smart Bin"
          />
        </animated.div>
      </section>

      {/* First Card */}
      <div className="max-w-full bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2">
        <h3 className="text-3xl font-semibold mb-4">
          {" "}
          Why Recycle? A World of Benefits:
        </h3>
       

        <p className="mt-4 text-lg lg:text-2xl lg:mt-6 mb-6">
          Conserves Natural Resources: Recycling existing materials reduces the
          need to extract virgin resources like trees for paper or metals for
          cans. This protects forests, reduces mining, and preserves natural
          habitats. Combats Climate Change: Manufacturing new products from
          scratch creates greenhouse gases. Recycling uses less energy, leading
          to a smaller carbon footprint and a cooler planet. Reduces Landfill
          Waste: Landfills are overflowing, causing environmental problems like
          soil and water contamination. Recycling diverts tons of waste,
          extending the lifespan of landfills.{" "}
        </p>
      </div>

      {/* Second Card */}
      <div className="max-w-full bg-white rounded-lg shadow-lg p-6 mt-8 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2">
        <h3 className="text-3xl font-semibold mb-4">
          {" "}
          Recyclables
        </h3>
       

        <p className="mt-4 text-lg lg:text-2xl lg:mt-6 mb-6">
        Paper (cardboard, newspapers, clean office paper), plastic bottles and containers (check for recycling symbols), metal cans, glass bottles and jars.
Organics: Food scraps, yard waste (leaves, twigs) can be composted to create nutrient-rich fertilizer for your garden.
Landfill Waste: Generally, anything that isn't recyclable or compostable goes here. This includes soiled food containers, plastic bags (check with your local program), and hazardous waste.
Hazardous Waste: Items like batteries, paint, electronics, and medication require special disposal procedures to prevent environmental contamination. Check with your local authority for designated drop-off locations.
{" "}
        </p>
      </div>
    </div>
  );
}
