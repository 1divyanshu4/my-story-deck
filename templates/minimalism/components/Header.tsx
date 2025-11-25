"use client";

import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/utils";
import { X as CrossIcon, Menu as MenuIcon, User } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";

interface HeaderProps {
  name: string;
}

interface NavLinksProps {
  onLinkClick?: () => void;
}

// --- NavLinks Component ---
const NavLinks: React.FC<NavLinksProps> = ({ onLinkClick }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id, 80);
    onLinkClick?.();
  };

  return (
    <>
      <Button className="text-xl" variant="link">
        <a
          href="#journey"
          onClick={(e) => handleClick(e, "journey")}
          className=""
        >
          Journey
        </a>
      </Button>
      <Button className="text-xl" variant="link">
        <a
          href="#projects"
          onClick={(e) => handleClick(e, "projects")}
          className=""
        >
          Projects
        </a>
      </Button>
    </>
  );
};

export const Header: React.FC<HeaderProps> = ({ name }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

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

  const handleHeroClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId("hero", 80);
    closeMenu();
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToId("contact", 80);
    closeMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-md border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <a
            href="#hero"
            onClick={handleHeroClick}
            className="flex items-center gap-2 group shrink-0"
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
              onClick={handleContactClick}
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
        className={`fixed inset-0 top-16 z-30 bg-white transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="h-full flex flex-col items-start px-6 pt-8">
          <nav className="flex flex-col items-start gap-4 text-xl font-semibold text-gray-800 w-full">
            <div className="flex flex-col items-start gap-2 pl-8">
              <NavLinks onLinkClick={closeMenu} />
            </div>

            <div className="mt-6 w-full h-px bg-gray-200"></div>

            <a
              href="#contact"
              onClick={handleContactClick}
              className="mt-4 w-full text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Get in Touch
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};
