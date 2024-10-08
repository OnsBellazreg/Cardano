import type { SVGProps } from 'react';
import * as React from 'react';
const SvgLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={582}
    height={582}
    fill="none"
    {...props}
  >
    <rect width={582} height={582} fill="url(#Logo_svg__a)" rx={291} />
    <path
      fill="#fff"
      d="m157.521 303.421 198.36-196.995c3.706-3.68 9.669.799 7.168 5.383L289.22 247.123c-1.647 3.018.538 6.698 3.976 6.698h127.586c4.11 0 6.095 5.036 3.09 7.84L200.293 470.326c-4.009 3.741-9.976-1.53-6.757-5.97l105.837-146.005c2.17-2.994.031-7.187-3.667-7.187H160.713c-4.043 0-6.06-4.894-3.192-7.743"
    />
    <defs>
      <linearGradient
        id="Logo_svg__a"
        x1={291}
        x2={291}
        y1={0}
        y2={582}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7BCBD4" />
        <stop offset={1} stopColor="#29C6B7" />
      </linearGradient>
    </defs>
  </svg>
);
export default SvgLogo;
