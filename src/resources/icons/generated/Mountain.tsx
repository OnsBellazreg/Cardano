import type { SVGProps } from 'react';
import * as React from 'react';
const SvgMountain = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    {...props}
  >
    <path d="m8 3 4 8 5-5 5 15H2z" />
    <path d="M4.14 15.08q3.93-2.355 7.86.42c2.74 1.94 5.49 2 8.23.19" />
  </svg>
);
export default SvgMountain;
