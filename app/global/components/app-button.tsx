import {LinkProps} from '@remix-run/react';
import React, {PropsWithChildren} from 'react';

import {Button, ButtonProps} from '@mui/material';

import {I18nLink} from './i18n-link';

//
//

export type AppButtonProps = LinkProps & ButtonProps;

export const AppButton = React.forwardRef<HTMLButtonElement, PropsWithChildren<AppButtonProps>>(
  ({viewTransition = true, children, ...props}, ref) => {
    return (
      // @ts-expect-error - `LinkOwnProps` is not compatible with `ButtonProps`
      <Button ref={ref} viewTransition={viewTransition} LinkComponent={I18nLink} {...props}>
        {children}
      </Button>
    );
  },
);

AppButton.displayName = 'AppButton';
