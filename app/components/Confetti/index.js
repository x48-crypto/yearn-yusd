import React from 'react';
import useWindowSize from 'react-use-window-size';
import Confetti from 'react-confetti';

export default () => {
  const { width, height } = useWindowSize();
  const variant = true;
  const _variant = variant
    ? variant
    : height && width && height > 1.5 * width
    ? 'bottom'
    : variant;

  return (
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={400}
      confettiSource={{
        h: height,
        w: width,
        x: 0,
        y:
          _variant === 'top'
            ? height * 0.25
            : _variant === 'bottom'
            ? height * 0.75
            : height * 0.5,
      }}
      initialVelocityX={15}
      initialVelocityY={30}
      gravity={0.45}
      tweenDuration={100}
      wind={0.05}
      run={true}
    />
  );
};
