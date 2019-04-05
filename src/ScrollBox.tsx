// import * as React from 'react';
// import Scrollbars, { positionValues, ScrollbarProps } from 'react-custom-scrollbars';

// import { Box, IBox } from './Box';
// import { useScrollToHash } from './hooks/useScrollToHash';
// import { ITheme, useTheme } from './theme';
// import { getScrollTransform, getThumbDimension, horizontalTrackStyle, verticalTrackStyle } from './utils/scroll';

// /**
//  * THUMB
//  * this is the actual bar
//  */
// interface IScrollBoxThumb extends IBox<HTMLDivElement> {
//   isScrolling: boolean;
// }

// const ScrollbarThumb: React.FunctionComponent<IScrollBoxThumb> = React.forwardRef<HTMLDivElement, IScrollBoxThumb>(
//   function ScrollbarThumb(props, ref) {
//     const { isScrolling, css, ...rest } = props;

//     const { scrollbar: theme } = useTheme();

//     return <Box {...rest} ref={ref} css={[scrollbarStyles(theme, { isScrolling }), css]} />;
//   }
// );

// ScrollbarThumb.displayName = 'ScrollbarThumb';

// const scrollbarStyles = (theme: ITheme['scrollbar'], { isScrolling }: IScrollBoxThumb) => {
//   return {
//     backgroundColor: theme.bg,
//     borderRadius: '5px',
//     cursor: 'grab',
//     opacity: isScrolling ? 1 : 0,
//     transition: 'opacity .1s',
//   };
// };

// /**
//  * SCROLLBOX
//  */

// export interface IScrollBox extends ScrollbarProps {
//   innerRef?: React.RefObject<Scrollbars>;

//   autoHeight?: boolean;
//   autoHideTimeout?: number;
//   onUpdate?: (values: positionValues) => void;

//   // can scroll to an anchor/id
//   scrollTo?: string;
// }

// const ScrollBox: React.FunctionComponent<IScrollBox> = (props: IScrollBox) => {
//   // pull out scrollTo so they are not in scrollbarProps (don't want them spread onto <Scrollbars /> component)
//   const { scrollTo, children, onUpdate, autoHeight = true, autoHideTimeout = 500, innerRef, ...scrollbarProps } = props;

//   const [isScrolling, setIsScrolling] = React.useState<null | number | NodeJS.Timer>(null);
//   useScrollToHash(scrollTo);

//   const scrollbars = innerRef || React.useRef<Scrollbars>(null);
//   const position = (scrollbars.current && scrollbars.current.getValues()) || ({} as positionValues);
//   const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = position;

//   const thumbHorizontal = getThumbDimension({ scroll: scrollWidth, client: clientWidth }) || 0;
//   const thumbVertical = getThumbDimension({ scroll: scrollHeight, client: clientHeight }) || 0;

//   return (
//     <Scrollbars
//       {...scrollbarProps}
//       ref={scrollbars}
//       autoHideTimeout={autoHideTimeout}
//       autoHeight={autoHeight}
//       onUpdate={onUpdate}
//       onScroll={(e: any) => {
//         if (isScrolling !== null) {
//           clearTimeout(isScrolling as number);
//         }

//         setIsScrolling(
//           setTimeout(() => {
//             setIsScrolling(null);
//           }, autoHideTimeout)
//         );
//       }}
//       renderView={({ style }: any) => {
//         // overide to offset the native scroll bars
//         return (
//           <div
//             style={{
//               ...style,
//               marginRight: '-15px',
//               marginBottom: '-15px',
//             }}
//           />
//         );
//       }}
//       // Custom component overrides
//       renderTrackHorizontal={() => <div style={horizontalTrackStyle()} />}
//       renderThumbHorizontal={() => (
//         <ScrollbarThumb
//           isScrolling={isScrolling !== null}
//           height="6px"
//           width={thumbHorizontal}
//           transform={`translateX(${getScrollTransform(clientWidth, scrollWidth, scrollLeft, thumbHorizontal)}px)`}
//         />
//       )}
//       renderTrackVertical={() => <div style={verticalTrackStyle()} />}
//       renderThumbVertical={() => (
//         <ScrollbarThumb
//           isScrolling={isScrolling !== null}
//           height={thumbVertical}
//           width="6px"
//           transform={`translateY(${getScrollTransform(clientHeight, scrollHeight, scrollTop, thumbVertical)}px)`}
//         />
//       )}
//     >
//       {children}
//     </Scrollbars>
//   );
// };

// ScrollBox.displayName = 'ScrollBox';

// export { Scrollbars as IScrollbars, ScrollBox };
