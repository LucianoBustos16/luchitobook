// src/components/ui/icons/Icons.jsx
import { iconPaths } from './Icons.ts';

export default function Icons({ 
  icon, 
  color = 'currentColor', 
  size = '1em',
  gradient = false 
}) {
  const iconPath = iconPaths[icon];
  const gradientId = 'icon-gradient-' + Math.random().toString(36).substr(2, 9);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 256 256"
      aria-hidden="true"
      stroke={gradient ? `url(#${gradientId})` : color}
      fill={gradient ? `url(#${gradientId})` : color}
      style={{ verticalAlign: 'middle' }}
    >
      <g dangerouslySetInnerHTML={{ __html: iconPath }} />
      {gradient && (
        <linearGradient
          id={gradientId}
          x1="23"
          x2="235"
          y1="43"
          y2="202"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--gradient-stop-1)" />
          <stop offset="0.5" stopColor="var(--gradient-stop-2)" />
          <stop offset="1" stopColor="var(--gradient-stop-3)" />
        </linearGradient>
      )}
    </svg>
  );
}