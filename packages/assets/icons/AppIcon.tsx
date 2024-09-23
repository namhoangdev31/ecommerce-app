import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import Icon from '@ant-design/icons'

const AppIconSVG = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_3396_22875)">
        <g filter="url(#filter0_ii_3396_22875)">
          <path
            d="M20 2.3094C22.4752 0.880339 25.5248 0.880339 28 2.3094L40.7846 9.6906C43.2598 11.1197 44.7846 13.7607 44.7846 16.6188V31.3812C44.7846 34.2393 43.2598 36.8803 40.7846 38.3094L28 45.6906C25.5248 47.1197 22.4752 47.1197 20 45.6906L7.21539 38.3094C4.74018 36.8803 3.21539 34.2393 3.21539 31.3812V16.6188C3.21539 13.7607 4.74018 11.1197 7.21539 9.6906L20 2.3094Z"
            fill="#272B30"
          />
        </g>
        <rect x="22" y="18" width="4" height="12" rx="2" fill="white" />
        <rect
          x="14"
          y="20"
          width="4"
          height="8"
          rx="2"
          fill="url(#paint0_linear_3396_22875)"
        />
        <rect
          x="30"
          y="20"
          width="4"
          height="8"
          rx="2"
          fill="url(#paint1_linear_3396_22875)"
        />
      </g>
      <defs>
        <filter
          id="filter0_ii_3396_22875"
          x="3.21484"
          y="0.237793"
          width="41.5703"
          height="47.5244"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.53 0"
          />
          <feBlend
            mode="multiply"
            in2="shape"
            result="effect1_innerShadow_3396_22875"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.838444 0 0 0 0 0.838444 0 0 0 0 0.838444 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_3396_22875"
            result="effect2_innerShadow_3396_22875"
          />
        </filter>
        <linearGradient
          id="paint0_linear_3396_22875"
          x1="16"
          y1="20"
          x2="16"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#D0D0D0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3396_22875"
          x1="32"
          y1="20"
          x2="32"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="#D0D0D0" />
        </linearGradient>
        <clipPath id="clip0_3396_22875">
          <rect width="48" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const AppIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={AppIconSVG} {...props} />
}
