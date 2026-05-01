import React, { useEffect, useState } from "react";

export default function SafeImg({ src, alt, style, onReady }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [triedProxy, setTriedProxy] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setTriedProxy(false);
    setFailed(false);
  }, [src]);

  const handleLoad = () => {
    onReady?.(true);
  };

  const handleError = () => {
    if (!triedProxy) {
      try {
        const encoded = encodeURIComponent(String(src).replace(/^https?:\/\//, ""));
        setImgSrc(`https://images.weserv.nl/?url=${encoded}`);
        setTriedProxy(true);
        return;
      } catch (_) {}
    }
    setFailed(true);
    onReady?.(false);
  };

  if (failed) {
    return (
      <div
        style={{
          background: "linear-gradient(135deg,#eef2ff,#e0f2fe)",
          borderRadius: 8,
          width: style?.width || "100%",
          height: style?.height || 160,
        }}
      />
    );
  }

  return (
    <img
      src={imgSrc}
      alt={alt || ""}
      onLoad={handleLoad}
      onError={handleError}
      style={{ maxWidth: "100%", height: "auto", ...style }}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}

