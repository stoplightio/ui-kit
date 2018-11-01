import { ITextProps, Text } from './Text';
import { listStylePosition, listStyleType, styled } from './utils';

export interface IListProps extends ITextProps {
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

export const List = styled<IListProps, 'ul'>(Text as any)(listStylePosition, listStyleType);

List.defaultProps = {
  as: 'ul',
};
