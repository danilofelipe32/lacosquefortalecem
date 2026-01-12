import React from 'react';

const GlobalStyles: React.FC = () => {
  return (
    <style>{`
      .hero-pattern {
        background-color: #f0f9ff;
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bae6fd' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background-color: #cbd5e1;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background-color: #94a3b8;
      }
      .timeline-line::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        background: #cbd5e1;
        z-index: 0;
      }
      @media (max-width: 768px) {
        .timeline-line::before {
          display: none;
        }
      }
      .typing-dot {
        animation: typing 1.4s infinite ease-in-out both;
      }
      .typing-dot:nth-child(1) { animation-delay: -0.32s; }
      .typing-dot:nth-child(2) { animation-delay: -0.16s; }
      @keyframes typing {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1); }
      }
      /* 3D Glow Effect for Navbar */
      .glow-item-wrapper { perspective: 600px; }
      .glow-item-front, .glow-item-back {
        backface-visibility: hidden;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .glow-item-front { transform-origin: center bottom; }
      .glow-item-back {
        transform-origin: center top;
        transform: rotateX(90deg);
        opacity: 0;
      }
      .group:hover .glow-item-front {
        transform: rotateX(-90deg);
        opacity: 0;
      }
      .group:hover .glow-item-back {
        transform: rotateX(0deg);
        opacity: 1;
      }
      .glow-bg {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0;
        transform: scale(0.8);
      }
      .group:hover .glow-bg {
        opacity: 1;
        transform: scale(1);
      }
    `}</style>
  );
};

export default GlobalStyles;