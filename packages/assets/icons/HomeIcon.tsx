import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'
import Icon from '@ant-design/icons'

const HomeIconSVG = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.993106 7.10625C0.360964 7.67518 0 8.48567 0 9.33613V17C0 18.6569 1.34315 20 3 20H17C18.6569 20 20 18.6569 20 17V9.33613C20 8.48567 19.639 7.67518 19.0069 7.10625L12.0069 0.80625C10.866 -0.220574 9.13402 -0.220572 7.9931 0.806251L0.993106 7.10625ZM9 11C7.89543 11 7 11.8955 7 13V17C7 17.5523 7.44772 18 8 18H12C12.5523 18 13 17.5523 13 17V13C13 11.8955 12.1046 11 11 11H9Z"
        fill="#1A1D1F"
      />
    </svg>
  )
}

export const HomeIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={HomeIconSVG} {...props} />
}
