import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const AgentIconSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={19}
      viewBox="0 0 19 19"
      fill="currentColor"
    >
      <path
        d="M8.738.953a5.07 5.07 0 00-2.672 1.379C4.75 3.637 4.27 5.516 4.793 7.316c.21.727.613 1.414 1.164 2 .176.184.3.344.277.352-.195.066-1.164.59-1.48.8-1.09.727-2.059 1.743-2.7 2.833-.78 1.32-1.253 2.972-1.05 3.664.2.695.7 1.191 1.367 1.367.203.05 1.07.059 7.207.059s7.004-.008 7.207-.059c.668-.176 1.168-.672 1.367-1.367.172-.586-.129-1.828-.742-3.086a8.76 8.76 0 00-4.113-4.031 9.05 9.05 0 01-.395-.192c-.007-.008.13-.164.305-.347a4.99 4.99 0 001.36-3.668 4.997 4.997 0 00-3.446-4.512C10.414.899 9.457.824 8.738.953zm1.742 1.3a3.66 3.66 0 011.739.997c.508.504.816 1.05 1 1.754.125.473.125 1.324 0 1.785-.196.723-.48 1.211-1.004 1.738-.692.692-1.465 1.04-2.426 1.102a3.759 3.759 0 01-3.684-2.336c-.207-.52-.253-.777-.253-1.402 0-.465.015-.625.09-.899.187-.699.468-1.199.96-1.703a3.679 3.679 0 012.032-1.094c.375-.074 1.156-.043 1.546.059zM8.095 10.7c0 .02-.203.543-.453 1.172l-.454 1.14.016.298c.012.23.043.343.125.5.14.254 1.457 1.566 1.703 1.695.149.078.235.094.547.094.524 0 .606-.055 1.496-.954.637-.64.73-.753.805-.953.164-.441.14-.562-.367-1.832-.246-.62-.45-1.14-.45-1.16 0-.015.098-.066.215-.11l.211-.077.45.144c1.617.528 2.992 1.594 3.945 3.055.582.894 1.152 2.465 1.062 2.937a.665.665 0 01-.363.438c-.188.082-13.82.082-14.008 0a.651.651 0 01-.363-.445c-.063-.317.23-1.325.613-2.118a7.498 7.498 0 014.38-3.863l.46-.152.215.082c.117.043.215.094.215.11zm2.16 1.38l.469 1.163-.575.57-.57.575-.57-.575-.574-.57.441-1.105c.242-.61.457-1.14.477-1.18.027-.055.074-.066.238-.059l.2.012.464 1.168z"
        fill="currentColor"
      />
    </svg>
  );
};

export const AgentIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={AgentIconSVG} {...props} />;
};
