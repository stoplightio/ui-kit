import { ITextProps, Text } from './Text';
import { ICSSProps } from './types';
import { listStylePosition, listStyleType, styled } from './utils';

export interface IListProps extends ITextProps {
  listPosition?: ICSSProps['listPosition'];
  itemType?: ICSSProps['listItemType'];
}

export const List = styled<IListProps, 'ul'>(Text as any)(listStylePosition, listStyleType);

List.defaultProps = {
  as: 'ul',
};
