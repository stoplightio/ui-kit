import flattenDeep = require('lodash/flattenDeep');
import * as React from 'react';
import * as ss from 'styled-system';

import { Box, IBox } from './Box';
import * as sl from './styles';

export interface IFlex<T extends HTMLElement = HTMLElement>
  extends IBox<T>,
    ss.FlexBasisProps,
    ss.FlexDirectionProps,
    ss.FlexWrapProps,
    ss.AlignItemsProps,
    ss.JustifyContentProps {}

export const Flex: React.FunctionComponent<IFlex> = props => {
  const { flexBasis, flexFlow, flexDirection, flexWrap, alignItems, justifyContent, css, ...rest } = props;

  const styles = [
    ...flattenDeep([css]),
    ss.flexBasis({ flexBasis }),
    ss.flexDirection({ flexDirection }),
    ss.flexWrap({ flexWrap }),
    ss.alignItems({ alignItems }),
    ss.justifyContent({ justifyContent }),
    sl.flexFlow({ flexFlow }),
    flexStyles(),
  ];

  return <Box {...rest} css={styles} />;
};

export const flexStyles = () => ({ display: 'flex' });
