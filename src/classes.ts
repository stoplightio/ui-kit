/**
 * EASY EXPORT CLASSES TO USE ELSEWHERE
 */
import { Classes as BPClasses } from '@blueprintjs/core';

const NS = process.env.BLUEPRINT_NAMESPACE || 'bp3';

/**
 * EXPORTS
 */
export const Classes = {
  ...BPClasses,
  NS,
  CODE_EDITOR: `${NS}-code-editor`,
  SIMPLE_TAB: `${NS}-simple-tab`,
  SIMPLE_TAB_LIST: `${NS}-simple-tab-list`,
  SIMPLE_TAB_PANEL: `${NS}-simple-tab-panel`,
  SCROLL_TRACK: `${NS}-scroll-track`,
  SCROLL_THUMB: `${NS}-scroll-thumb`,
};
