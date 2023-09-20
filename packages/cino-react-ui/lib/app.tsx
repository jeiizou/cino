import { CinoModel } from './hooks/use-cino';
import Desktop from './components/desktop';
import React from 'react';
import './app.scss';
import { composeProviders } from './hooks/basic/use-model';
import { WindowModel } from './components/window-layout/window-model';

interface CinoDesktopProps {
  children?: React.ReactNode | string;
}

const ModelProviders = composeProviders([WindowModel, CinoModel], 'ModelProviders');

export const CinoDesktop = ({ children }: CinoDesktopProps) => {
  return (
    <ModelProviders>
      {children}
      <Desktop />
    </ModelProviders>
  );
};
