import { CinoModel } from './hooks/use-cino';
import Desktop from './components/desktop';
import React from 'react';
import './app.scss';

interface CinoDesktopProps {
    children?: React.ReactNode | string;
}

export const CinoDesktop = ({ children }: CinoDesktopProps) => {
    return (
        <CinoModel.Provider>
            {children}
            123
            <Desktop />
        </CinoModel.Provider>
    );
};
