import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="font-bold mt-12 bg-red-200 mb-8 min-h-[30rem] rounded-lg p-4 relative overflow-hidden">
      <Image
        src="/flight.jpeg"
        alt="Background Image"
        fill
        className="object-cover"
      />

      {/* Content */}
      <div className="absolute bottom-4 left-4 z-10">
        <h1 className="text-5xl font-bold text-white mb-4">
          Find the best flights
        </h1>
        <p className="text-lg font-mono text-white mb-8">
          Easily compare prices and plan your next trip
        </p>

        <div className="flex gap-6">
          <Button className="bg-blue-400 rounded-lg p-3 px-3 md:px-10">Round Trip</Button>
          <Button className="bg-white rounded-lg p-3 px-3 md:px-10">One Way</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
