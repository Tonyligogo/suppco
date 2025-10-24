import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import HeroImage from "@/public/hero-bg-2.jpg";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative h-[calc(100vh+20vh)] 2xl:h-[80vh] w-full text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HeroImage}
          alt="heavy machinery carrying ballast"
          width={1500}
          height={1500}
          className="w-full h-full object-cover object-center absolute inset-0"
        />
        <div className="absolute inset-0 bg-gray-900/90" />
        <div className="relative z-10 flex h-full items-center justify-center md:max-w-7xl md:mx-auto px-4">
          <div>
            <div className="max-w-4xl text-white md:text-center space-y-5">
              <p className="hidden md:block font-semibold text-sm">
                DIGITISE YOUR CONSTRUCTION SUPPLY CHAIN
              </p>
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Get <span className="hidden md:inline-block">construction</span>{" "}
                materials.
              </p>
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold">
                From any supplier.
              </p>
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold">
                In one platform.
              </p>
            </div>
            <div className="flex flex-col md:flex-row justify-center gap-5 my-20">
              <Button
                asChild
                size="lg"
                className="font-semibold text-lg px-8 py-3"
              >
                <Link
                  href="https://forms.gle/GR8fQ4ncWerTVzLZ9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join as a Supplier
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-black font-semibold text-lg px-8 py-3"
              >
                <Link
                  href="https://forms.gle/5thA4kdEqvUxYUor9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join as a Contractor
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <span className="text-2xl font-bold block">200+ Suppliers</span>
                <span>onboarded</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <span className="text-2xl font-bold block">
                  1k+ assets/materials
                </span>
                <span>verified</span>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <span className="text-2xl font-bold block">
                  500+ Contractors
                </span>
                <span>trust us</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
