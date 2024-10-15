import React from 'react';
import Image from 'next/image';
import AppIconSVG from '../doll.png';

const AppIcon: React.FC = () => (
  <Image
    src={AppIconSVG}
    width={100}
    height={100}
    alt="App Icon"
    style={{ objectFit: 'contain' }}
  />
);

export default AppIcon;
