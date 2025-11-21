"use client";

import React, { useState, useEffect, useRef } from "react";

// --- Type Definitions ---
interface ResponsivePreviewProps {
  children: React.ReactNode;
}

// --- Constants for Iframe Content Injection ---
const TAILWIND_SCRIPT = `<script src="https://cdn.tailwindcss.com"></script>`;
const GLOBAL_CSS_LINK = `<link rel="stylesheet" href="/globals.css">`;
const VIEWPORT_META = `<meta name="viewport" content="width=device-width, initial-scale=1.0">`;
const FONT_LINK = `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">`;
const BASE_STYLE = `
    <style>
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; min-height: 100vh; overflow-y: auto; }
    </style>
`;

const buildIframeHtml = (content: string): string => `
    <!DOCTYPE html>
    <html>
    <head>
        ${VIEWPORT_META}
        ${TAILWIND_SCRIPT}
        ${FONT_LINK}
        ${BASE_STYLE}
        ${GLOBAL_CSS_LINK}
    </head>
    <body>
        <div id="root" class="min-h-full">
            ${content}
        </div>
    </body>
    </html>
`;

const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({ children }) => {
  // State to hold the rendered HTML string of children
  const [renderedHtml, setRenderedHtml] = useState<string>("");

  // Ref for the iframe element where content is displayed
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Ref for the hidden container where children are rendered to capture HTML
  const childrenContainerRef = useRef<HTMLDivElement>(null);

  // State to track the actual current width of the container for display purposes
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Effect to capture the HTML of the rendered children
  useEffect(() => {
    const container = childrenContainerRef.current;
    if (container) {
      setRenderedHtml(container.innerHTML);
    }
  }, [children]);

  // 2. Effect to inject the captured HTML content into the iframe
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow || !renderedHtml) return;

    // If no content, display a placeholder message
    const contentToInject =
      renderedHtml.trim() === ""
        ? '<div class="p-6 text-center">No content provided to test.</div>'
        : renderedHtml;

    const completeHtml = buildIframeHtml(contentToInject);

    // Write content to the iframe's document
    try {
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(completeHtml);
      iframe.contentWindow.document.close();
    } catch (error) {
      console.error("Failed to inject content into iframe:", error);
    }
  }, [renderedHtml]);

  return (
    <div className="h-screen flex flex-col items-center w-full text-foreground">
      <div ref={childrenContainerRef} style={{ display: "none" }}>
        {children}
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden"
      >
        {/* The iframe container uses w-full to match the parent's width */}
        <div className="w-full h-full">
          <iframe
            ref={iframeRef}
            title="Container Responsive Preview"
            sandbox="allow-scripts allow-same-origin"
            className="w-full h-full border-none"
            style={{ colorScheme: "light" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ResponsivePreview;
