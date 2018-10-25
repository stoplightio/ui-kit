import * as React from 'react';
import { listStylePosition, listStyleType, styled } from '../utils';

import { ITextProps, Text } from './Text';

export interface IListProps extends ITextProps {
  ordered?: boolean;
  listPosition?: 'inside' | 'outside' | 'initial' | 'inherit';
  itemType?:
    | 'circle'
    | 'disc'
    | 'square'
    | 'armenian'
    | 'cjk-ideographic'
    | 'decimal'
    | 'decimal-leading-zero'
    | 'georgian'
    | 'hebrew'
    | 'hiragana'
    | 'hiragana-iroha'
    | 'katakana'
    | 'katakana-iroha'
    | 'lower-alpha'
    | 'lower-greek'
    | 'lower-latin'
    | 'lower-roman'
    | 'upper-alpha'
    | 'upper-greek'
    | 'upper-latin'
    | 'upper-roman'
    | 'none'
    | 'inherit';
}

export const List = styled<IListProps>(({ ordered, itemType, listPosition, ...textProps }) => (
  <Text {...textProps} as={ordered ? 'ol' : 'ul'} />
))(listStylePosition, listStyleType);

List.defaultProps = {};
