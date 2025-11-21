"use client";

import { scrollToId } from "@/lib/utils";
import { CrossIcon, MenuIcon, User } from "lucide-react";
import React, { useState, useEffect } from "react";

interface HeaderProps {
  name: string;
}

const NavLinks = () => (
  <>
    <a
      href="#journey"
      onClick={(e) => {
        e.preventDefault();
        scrollToId("journey", 80); // offset = 80px
      }}
      className="hover:text-gray-900 transition-colors"
    >
      Journey
    </a>
    <a
      href="#projects"
      onClick={(e) => {
        e.preventDefault();
        scrollToId("projects", 80); // offset = 80px
      }}
      className="hover:text-gray-900 transition-colors"
    >
      Projects
    </a>
  </>
);
export const Header: React.FC<HeaderProps> = ({ name }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      body.style.overflow = isMenuOpen ? "hidden" : "auto";
    }
    return () => {
      if (body) {
        body.style.overflow = "auto";
      }
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-gray-50 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20  flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("hero", 80); // offset = 80px
            }}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 p-1.5 border-2 border-gray-800 rounded-lg flex items-center justify-center">
              <User className="w-full h-full text-gray-800" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-gray-800 group-hover:text-gray-950 transition-colors">
              {name || "Alex Doe"}
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-base font-medium text-gray-600">
            <NavLinks />
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact", 80); // offset = 80px
              }}
              className="hidden md:inline-block px-5 py-2 bg-gray-900 text-white font-semibold text-sm rounded-lg shadow-sm hover:bg-gray-800 transition-colors duration-300"
            >
              Get in Touch
            </a>

            <button
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors z-50"
            >
              {isMenuOpen ? (
                <CrossIcon className="w-6 h-6 text-gray-800" />
              ) : (
                <MenuIcon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-white transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="h-full flex flex-col items-center justify-center">
          <nav className="flex flex-col items-center gap-10 text-2xl font-semibold text-gray-800">
            <NavLinks />
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("contact", 80); // offset = 80px
              }}
              className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};
