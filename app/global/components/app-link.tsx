import {LinkProps} from '@remix-run/react';
import React, {useMemo} from 'react';

import {Link as MuiLink, LinkProps as MuiLinkProps} from '@mui/material';

import {I18nLink} from './i18n-link';

//
//

type MuiAppI18nLinkProps = LinkProps & Omit<MuiLinkProps, 'href'>;

export const AppLink: React.FC<MuiAppI18nLinkProps> = ({
  viewTransition = true,
  children,
  to,
  ...props
}: MuiAppI18nLinkProps) => {
  const LinkComponent = useMemo(() => {
    const Component = React.forwardRef((linkProps: Omit<MuiAppI18nLinkProps, 'to'>, ref) => (
      <I18nLink ref={ref} to={to} {...linkProps} />
    ));
    Component.displayName = 'LinkComponent';

    return Component;
  }, [viewTransition, to]);

  return (
    <MuiLink component={LinkComponent} {...props}>
      {children}
    </MuiLink>
  );
};
