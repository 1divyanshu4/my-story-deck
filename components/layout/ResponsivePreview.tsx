"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";

interface ResponsivePreviewProps {
  children: React.ReactNode;
}

const IFRAME_INITIAL_CONTENT = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: ui-sans-serif, system-ui, sans-serif; 
            background-color: white;
        }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
    </style>
    <script>
        tailwind.config = {
            theme: { extend: {} },
        }
    </script>
</head>
<body>
    <div id="iroot"></div>
</body>
</html>
`;

const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({ children }) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [iframeLoaded, setIframeLoaded] = useState(false);

  const setupIframe = (iframe: HTMLIFrameElement) => {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (doc) {
      doc.open();
      doc.write(IFRAME_INITIAL_CONTENT);
      doc.close();
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    setupIframe(iframe);

    const handleLoad = () => {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        const root = doc.getElementById("iroot");
        if (root) {
          setMountNode(root);
          setIframeLoaded(true);
        }
      }
    };

    iframe.addEventListener("load", handleLoad);

    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full h-full bg-gray-50 text-gray-900">
      <div className="relative w-full h-full p-4 pl-2 flex flex-col gap-2">
        {/* Header */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2 ">
          <span className="font-medium">Preview Mode</span>
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
            Unpublished
          </span>
          <Button size={"sm"}>Publish</Button>
        </div>

        {/* Iframe Container */}
        <div className="flex-1 w-full border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm">
          <iframe
            ref={iframeRef}
            title="Tailwind Responsive Preview"
            sandbox="allow-scripts allow-same-origin allow-forms"
            className="w-full h-full border-none"
            style={{ colorScheme: "light" }}
          />

          {mountNode && iframeLoaded && createPortal(children, mountNode)}
        </div>
      </div>
    </div>
  );
};

export default ResponsivePreview;
