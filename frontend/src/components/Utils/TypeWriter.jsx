import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function TypeWriter({ content }) {
  return (
    <>
      <TypeAnimation
        sequence={content}
        wrapper="span"
        cursor={true}
        repeat={Infinity}
        style={{
          fontSize: "1em",
          display: "inline-block",
          color: "black",
        }}
      />
    </>
  );
}
