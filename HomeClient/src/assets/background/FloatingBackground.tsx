const FloatingBackground = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1440"
      height="560"
      preserveAspectRatio="none"
      viewBox="0 0 1440 560"
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    >
      <defs>
        <style>
          {`
            @keyframes float1 {
              0% { transform: translate(0, 0); }
              50% { transform: translate(-50px, 0); }
              100% { transform: translate(0, 0); }
            }

            .triangle-float1 {
              animation: float1 3s infinite;
            }

            @keyframes float2 {
              0% { transform: translate(0, 0); }
              50% { transform: translate(-20px, -20px); }
              100% { transform: translate(0, 0); }
            }

            .triangle-float2 {
              animation: float2 3s infinite;
            }

            @keyframes float3 {
              0% { transform: translate(0, 0); }
              50% { transform: translate(0, -50px); }
              100% { transform: translate(0, 0); }
            }

            .triangle-float3 {
              animation: float3 3s infinite;
            }
          `}
        </style>
      </defs>

      <g mask="url(#SvgjsMask1907)" fill="none">
        <rect width="1440" height="560" x="0" y="0" fill="url(#SvgjsLinearGradient1908)"></rect>

        <path d="M-105.79 31.11a136.9 136.9 0 1 0 273.8 0a136.9 136.9 0 1 0 -273.8 0z"
          fill="rgba(2, 80, 180, 0.05)" className="triangle-float1" />
        <path d="M-123.39 48.73a172.12 172.12 0 1 0 344.24 0a172.12 172.12 0 1 0 -344.24 0z"
          fill="rgba(2, 80, 180, 0.05)" className="triangle-float2" />
        <path d="M1210.63 42.7a160.07 160.07 0 1 0 320.14 0a160.07 160.07 0 1 0 -320.14 0z"
          fill="rgba(2, 80, 180, 0.05)" className="triangle-float2" />
        <path d="M1231.73 21.61a117.88 117.88 0 1 0 235.76 0a117.88 117.88 0 1 0 -235.76 0z"
          fill="rgba(2, 80, 180, 0.05)" className="triangle-float3" />
        <path d="M-103.93 477.27a133.2 133.2 0 1 0 266.4 0a133.2 133.2 0 1 0 -266.4 0z"
          fill="rgba(2, 80, 180, 0.05)" className="triangle-float3" />
        <path d="M-119.33 492.66a163.99 163.99 0 1 0 327.98 0a163.99 163.99 0 1 0 -327.98 0z"
          fill="rgba(2, 80, 180, 0.05)" className="triangle-float1" />
        <path d="M1253.86 447.48a73.62 73.62 0 1 0 147.24 0a73.62 73.62 0 1 0 -147.24 0z"
          fill="rgba(2, 80, 180, 0.05)" className="triangle-float3" />
        <path d="M1234.37 466.97a112.6 112.6 0 1 0 225.2 0a112.6 112.6 0 1 0 -225.2 0z"
          fill="rgba(2, 80, 180, 0.05)" className="triangle-float1" />
      </g>
    </svg>
  );
};

export default FloatingBackground;
