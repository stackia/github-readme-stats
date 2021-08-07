const calculateCircleProgress = (value) => {
  let radius = 40;
  let c = Math.PI * (radius * 2);

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  let percentage = ((100 - value) / 100) * c;
  return percentage;
};

const getProgressAnimation = ({ progress }) => {
  return `
    @keyframes rankAnimation {
      from {
        stroke-dashoffset: ${calculateCircleProgress(0)};
      }
      to {
        stroke-dashoffset: ${calculateCircleProgress(progress)};
      }
    }
  `;
};

const getAnimations = () => {
  return `
    /* Animations */
    @keyframes scaleInAnimation {
      from {
        transform: translate(-5px, 5px) scale(0);
      }
      to {
        transform: translate(-5px, 5px) scale(1);
      }
    }
    @keyframes fadeInAnimation {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    @keyframes flipInY {
      0% {
         transform: perspective(400px) rotateY(90deg);
         opacity: 0;
      }
      40% {
         transform: perspective(400px) rotateY(-10deg);
      }
      70% {
         transform: perspective(400px) rotateY(10deg);
      }
      100% {
         transform: perspective(400px) rotateY(0deg);
         opacity: 1;
      }
   }
  `;
};

const getStyles = ({
  titleColor,
  textColor,
  iconColor,
  show_icons,
  progress,
}) => {
  return `
    .stat {
      font: 400 14px Chilanka, 'Segoe Print', Ubuntu, "Helvetica Neue", Sans-Serif; fill: ${textColor};
    }
    .stagger {
      opacity: 0;
      animation: fadeInAnimation 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 800 24px Chilanka, 'Segoe Print', Ubuntu, Sans-Serif; fill: ${textColor}; 
      animation: scaleInAnimation 0.3s ease-in-out forwards;
    }
    
    .bold { font-weight: 400 }
    .icon {
      fill: ${iconColor};
      display: ${!!show_icons ? "block" : "none"};
    }
    
    .rank-circle-rim {
      stroke: ${titleColor};
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: ${titleColor};
      stroke-dasharray: 250;
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }
    .card-bg {
      animation: flipInY 1s both ease-in-out;
    }
    ${process.env.NODE_ENV === "test" ? "" : getProgressAnimation({ progress })}
  `;
};

module.exports = { getStyles, getAnimations };
