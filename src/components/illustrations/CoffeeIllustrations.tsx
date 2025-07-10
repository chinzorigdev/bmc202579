import React from "react";

// Custom illustration components for coffee theme
export const CoffeeIllustrations = {
  // Hero coffee cup with steam
  HeroCoffee: ({ className = "w-64 h-64" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coffee cup */}
      <ellipse cx="100" cy="180" rx="50" ry="8" fill="#E5E7EB" opacity="0.3" />
      <rect x="70" y="120" width="60" height="60" rx="8" fill="#F59E0B" />
      <rect x="75" y="125" width="50" height="50" rx="6" fill="#FBBF24" />

      {/* Coffee surface */}
      <ellipse cx="100" cy="130" rx="20" ry="4" fill="#92400E" />

      {/* Handle */}
      <path
        d="M130 140 Q145 140 145 155 Q145 170 130 170"
        stroke="#F59E0B"
        strokeWidth="6"
        fill="none"
      />

      {/* Steam */}
      <path
        d="M90 115 Q92 105 88 95 Q84 85 88 75"
        stroke="#E5E7EB"
        strokeWidth="3"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M100 115 Q98 105 102 95 Q106 85 102 75"
        stroke="#E5E7EB"
        strokeWidth="3"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />
      <path
        d="M110 115 Q112 105 108 95 Q104 85 108 75"
        stroke="#E5E7EB"
        strokeWidth="3"
        fill="none"
        opacity="0.7"
        strokeLinecap="round"
      />

      {/* Coffee beans decoration */}
      <ellipse
        cx="85"
        cy="100"
        rx="4"
        ry="6"
        fill="#92400E"
        transform="rotate(-15 85 100)"
      />
      <line x1="85" y1="95" x2="85" y2="105" stroke="#FBBF24" strokeWidth="1" />

      <ellipse
        cx="115"
        cy="95"
        rx="4"
        ry="6"
        fill="#92400E"
        transform="rotate(25 115 95)"
      />
      <line
        x1="115"
        y1="90"
        x2="115"
        y2="100"
        stroke="#FBBF24"
        strokeWidth="1"
      />
    </svg>
  ),

  // Creator working illustration
  CreatorAtWork: ({ className = "w-48 h-48" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Desk */}
      <rect x="20" y="140" width="160" height="40" rx="8" fill="#F3F4F6" />
      <rect x="25" y="135" width="150" height="8" fill="#E5E7EB" />

      {/* Laptop */}
      <rect x="60" y="120" width="80" height="20" rx="4" fill="#374151" />
      <rect x="65" y="115" width="70" height="10" fill="#1F2937" />

      {/* Screen content */}
      <rect x="70" y="117" width="15" height="2" fill="#F59E0B" />
      <rect x="70" y="120" width="25" height="1" fill="#9CA3AF" />
      <rect x="70" y="122" width="20" height="1" fill="#9CA3AF" />

      {/* Coffee cup on desk */}
      <rect x="140" y="125" width="20" height="15" rx="2" fill="#F59E0B" />
      <ellipse cx="150" cy="127" rx="6" ry="2" fill="#92400E" />

      {/* Person */}
      <circle cx="100" cy="85" r="15" fill="#FBBF24" />
      <rect x="90" y="100" width="20" height="30" rx="10" fill="#F59E0B" />

      {/* Arms */}
      <rect x="75" y="105" width="15" height="8" rx="4" fill="#FBBF24" />
      <rect x="110" y="105" width="15" height="8" rx="4" fill="#FBBF24" />

      {/* Creative elements floating around */}
      <circle cx="40" cy="60" r="3" fill="#F59E0B" opacity="0.6" />
      <circle cx="160" cy="70" r="2" fill="#FBBF24" opacity="0.6" />
      <circle cx="45" cy="40" r="2" fill="#F59E0B" opacity="0.4" />
      <circle cx="155" cy="45" r="3" fill="#FBBF24" opacity="0.4" />

      {/* Inspiration lines */}
      <path
        d="M35 55 Q40 50 45 55"
        stroke="#F59E0B"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M155 65 Q160 60 165 65"
        stroke="#FBBF24"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
    </svg>
  ),

  // Community support illustration
  CommunitySupport: ({ className = "w-48 h-48" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central coffee cup */}
      <rect x="85" y="90" width="30" height="30" rx="4" fill="#F59E0B" />
      <ellipse cx="100" cy="95" rx="10" ry="3" fill="#92400E" />

      {/* People around the cup */}
      {/* Person 1 */}
      <circle cx="60" cy="60" r="8" fill="#FBBF24" />
      <rect x="55" y="68" width="10" height="15" rx="5" fill="#F59E0B" />

      {/* Person 2 */}
      <circle cx="140" cy="60" r="8" fill="#FBBF24" />
      <rect x="135" y="68" width="10" height="15" rx="5" fill="#F59E0B" />

      {/* Person 3 */}
      <circle cx="60" cy="140" r="8" fill="#FBBF24" />
      <rect x="55" y="148" width="10" height="15" rx="5" fill="#F59E0B" />

      {/* Person 4 */}
      <circle cx="140" cy="140" r="8" fill="#FBBF24" />
      <rect x="135" y="148" width="10" height="15" rx="5" fill="#F59E0B" />

      {/* Support arrows/hearts */}
      <path
        d="M70 70 L90 90"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      <path
        d="M130 70 L110 90"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      <path
        d="M70 130 L90 110"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      <path
        d="M130 130 L110 110"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="3,3"
      />

      {/* Hearts */}
      <path
        d="M75 80 Q77 78 79 80 Q81 78 83 80 Q81 82 79 84 Q77 82 75 80"
        fill="#EF4444"
        opacity="0.7"
      />
      <path
        d="M115 80 Q117 78 119 80 Q121 78 123 80 Q121 82 119 84 Q117 82 115 80"
        fill="#EF4444"
        opacity="0.7"
      />
      <path
        d="M75 120 Q77 118 79 120 Q81 118 83 120 Q81 122 79 124 Q77 122 75 120"
        fill="#EF4444"
        opacity="0.7"
      />
      <path
        d="M115 120 Q117 118 119 120 Q121 118 123 120 Q121 122 119 124 Q117 122 115 120"
        fill="#EF4444"
        opacity="0.7"
      />
    </svg>
  ),

  // Money/coins flowing illustration
  MoneyFlow: ({ className = "w-48 h-48" }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Coffee cup at bottom */}
      <rect x="70" y="150" width="60" height="40" rx="6" fill="#F59E0B" />
      <ellipse cx="100" cy="155" rx="25" ry="6" fill="#92400E" />

      {/* Coins falling */}
      <circle cx="80" cy="120" r="8" fill="#FBBF24" />
      <circle cx="80" cy="120" r="5" fill="#F59E0B" />
      <text
        x="80"
        y="124"
        textAnchor="middle"
        fontSize="8"
        fill="white"
        fontWeight="bold"
      >
        ₮
      </text>

      <circle cx="120" cy="100" r="8" fill="#FBBF24" />
      <circle cx="120" cy="100" r="5" fill="#F59E0B" />
      <text
        x="120"
        y="104"
        textAnchor="middle"
        fontSize="8"
        fill="white"
        fontWeight="bold"
      >
        ₮
      </text>

      <circle cx="90" cy="80" r="8" fill="#FBBF24" />
      <circle cx="90" cy="80" r="5" fill="#F59E0B" />
      <text
        x="90"
        y="84"
        textAnchor="middle"
        fontSize="8"
        fill="white"
        fontWeight="bold"
      >
        ₮
      </text>

      <circle cx="110" cy="60" r="8" fill="#FBBF24" />
      <circle cx="110" cy="60" r="5" fill="#F59E0B" />
      <text
        x="110"
        y="64"
        textAnchor="middle"
        fontSize="8"
        fill="white"
        fontWeight="bold"
      >
        ₮
      </text>

      <circle cx="100" cy="40" r="8" fill="#FBBF24" />
      <circle cx="100" cy="40" r="5" fill="#F59E0B" />
      <text
        x="100"
        y="44"
        textAnchor="middle"
        fontSize="8"
        fill="white"
        fontWeight="bold"
      >
        ₮
      </text>

      {/* Motion lines */}
      <path
        d="M75 115 Q77 110 79 115"
        stroke="#F59E0B"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M85 75 Q87 70 89 75"
        stroke="#F59E0B"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M115 95 Q117 90 119 95"
        stroke="#F59E0B"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M105 55 Q107 50 109 55"
        stroke="#F59E0B"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M95 35 Q97 30 99 35"
        stroke="#F59E0B"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  ),

  // Simple step icons
  StepIcon: ({
    step,
    className = "w-16 h-16",
  }: {
    step: number;
    className?: string;
  }) => (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="#FEF3C7"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      <circle cx="32" cy="32" r="20" fill="#F59E0B" />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontSize="18"
        fill="white"
        fontWeight="bold"
      >
        {step}
      </text>
    </svg>
  ),

  // Decorative elements
  FloatingCoffeeBean: ({
    className = "w-8 h-8",
    style,
  }: {
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <svg
      className={className}
      style={style}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="16" cy="16" rx="8" ry="12" fill="#92400E" />
      <path d="M16 8 Q20 16 16 24 Q12 16 16 8" fill="#FBBF24" />
    </svg>
  ),

  // Success/celebration illustration
  SuccessIllustration: ({
    className = "w-32 h-32",
  }: {
    className?: string;
  }) => (
    <svg
      className={className}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Confetti */}
      <rect
        x="20"
        y="20"
        width="4"
        height="4"
        fill="#F59E0B"
        transform="rotate(45 20 20)"
      />
      <rect
        x="100"
        y="25"
        width="4"
        height="4"
        fill="#FBBF24"
        transform="rotate(45 100 25)"
      />
      <rect
        x="30"
        y="100"
        width="4"
        height="4"
        fill="#F59E0B"
        transform="rotate(45 30 100)"
      />
      <rect
        x="90"
        y="105"
        width="4"
        height="4"
        fill="#FBBF24"
        transform="rotate(45 90 105)"
      />

      {/* Central checkmark in coffee cup */}
      <rect x="44" y="50" width="40" height="40" rx="8" fill="#F59E0B" />
      <ellipse cx="64" cy="55" rx="15" ry="4" fill="#92400E" />

      {/* Checkmark */}
      <path
        d="M54 64 L60 70 L74 56"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// Background decorative pattern
export const BackgroundPattern = ({
  className = "absolute inset-0 opacity-5",
}: {
  className?: string;
}) => (
  <div className={className}>
    <svg
      className="w-full h-full"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <g key={i}>
          <CoffeeIllustrations.FloatingCoffeeBean
            className="absolute"
            style={{
              left: `${(i * 47) % 400}px`,
              top: `${(i * 73) % 400}px`,
              transform: `rotate(${i * 23}deg)`,
            }}
          />
        </g>
      ))}
    </svg>
  </div>
);
