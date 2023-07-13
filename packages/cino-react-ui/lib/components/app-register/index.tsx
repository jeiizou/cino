import { CinoApplication } from 'cino-core';
import { CinoModel } from '../../hooks/use-cino';
import React, { useEffect } from 'react';

type AppRegisterProps = {
    apps?: CinoApplication[];
};

export function AppRegister({
    apps = [],
}: AppRegisterProps): React.ReactElement {
    const { cino } = CinoModel.useContext();

    useEffect(() => {
        if (cino) {
            apps?.map(app => cino.install(app));
        }
    }, [cino, apps]);

    return <></>;
}
