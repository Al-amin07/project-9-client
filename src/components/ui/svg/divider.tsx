import * as React from "react";

const Divider = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        viewBox="0 0 2058 279"
        fill="none"
        ref={ref}
        className={className}
        {...props}
      >
        <path
          d="M963.098 161.101C487.702 -189.736 172.041 128.141 0.898438 221.952V278.337H2057.45V232.41C2057.45 232.41 1981.31 194.625 1898.67 161.101C1623.78 49.589 1365.45 458.03 963.098 161.101Z"
          fill="currentColor"
        />
     
      </svg>
    );
  }
);
Divider.displayName = "Divider";

export { Divider };
