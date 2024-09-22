import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const GridIconSVG = () => {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke="#084DA4" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7h1" />
        <g opacity={0.4}>
          <path d="M2.03 8.5H22M2.03 15.5H12M8.51 21.99V2.01M15.51 11.99V2.01" />
        </g>
        <path
          d="M18.73 14.67l-4.15 4.15c-.16.16-.31.47-.35.69L14 21.1c-.08.57.32.98.89.89l1.59-.23c.22-.03.53-.19.69-.35l4.15-4.15c.71-.71 1.05-1.55 0-2.6-1.04-1.04-1.87-.71-2.59.01zM18.14 15.26a3.761 3.761 0 002.6 2.6"
          strokeMiterlimit={10}
        />
      </g>
    </svg>
  );
};

export const GridIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={GridIconSVG} {...props} />;
};
