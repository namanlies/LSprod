import React from "react";

function LinkIcon({ color }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 6 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.97597 0C1.33916 0 0 1.33916 0 2.97598V6.61329C0 8.2501 1.33916 9.58927 2.97597 9.58927H3.63724C3.81911 9.58927 3.96788 9.44049 3.96788 9.25863C3.96788 9.07676 3.8191 8.928 3.63724 8.928H2.97597C1.70289 8.928 0.661386 7.88637 0.661386 6.61341V2.9761C0.661386 1.70301 1.70301 0.661506 2.97597 0.661506C4.24906 0.661506 5.29056 1.70313 5.29056 2.9761V6.28274C5.29056 6.46461 5.43933 6.61338 5.62119 6.61338C5.80306 6.61338 5.95183 6.4646 5.95183 6.28274L5.95194 2.9761C5.95194 1.33928 4.61279 0.000118086 2.97597 0.000118086L2.97597 0Z"
        fill={color}
      />
      <path
        d="M2.97598 6.28265H2.31471C2.13284 6.28265 1.98408 6.43142 1.98408 6.61328C1.98408 6.79516 2.13285 6.94392 2.31471 6.94392H2.97598C4.24906 6.94392 5.29057 7.98554 5.29057 9.25851V12.8958C5.29057 14.1689 4.24894 15.2104 2.97598 15.2104C1.70289 15.2104 0.66139 14.1688 0.66139 12.8958V9.58917C0.66139 9.4073 0.512619 9.25854 0.330757 9.25854C0.148895 9.25854 0.00012207 9.40731 0.00012207 9.58917V12.8958C0.00012207 14.5326 1.33928 15.8718 2.9761 15.8718C4.61291 15.8718 5.95207 14.5326 5.95207 12.8958L5.95195 9.25851C5.95195 7.62169 4.6128 6.28253 2.97598 6.28253L2.97598 6.28265Z"
        fill={color}
      />
      <path
        d="M1.65339 10.5812C1.47152 10.5812 1.32275 10.73 1.32275 10.9119V12.8958C1.32275 13.8052 2.06672 14.5492 2.97608 14.5492C3.88544 14.5492 4.62941 13.8052 4.62941 12.8958C4.62941 12.714 4.48064 12.5652 4.29878 12.5652C4.1169 12.5652 3.96814 12.714 3.96814 12.8958C3.96814 13.4414 3.52171 13.8879 2.97608 13.8879C2.43045 13.8879 1.98403 13.4415 1.98403 12.8958V10.9119C1.98403 10.73 1.83525 10.5812 1.65339 10.5812Z"
        fill={color}
      />
      <path
        d="M4.29864 5.29067C4.48051 5.29067 4.62928 5.14189 4.62928 4.96003V2.97608C4.62928 2.06672 3.88531 1.32275 2.97595 1.32275C2.0666 1.32275 1.32263 2.06672 1.32263 2.97608C1.32263 3.15795 1.4714 3.30671 1.65327 3.30671C1.83514 3.30671 1.9839 3.15794 1.9839 2.97608C1.9839 2.43048 2.43033 1.98402 2.97595 1.98402C3.52158 1.98402 3.96801 2.43045 3.96801 2.97608V4.96003C3.96801 5.1419 4.11678 5.29067 4.29864 5.29067Z"
        fill={color}
      />
    </svg>
  );
}

export default LinkIcon;