/**
 * EASY EXPORT CLASSES TO USE ELSEWHERE
 */

const NS = process.env.BLUEPRINT_NAMESPACE || 'bp3';

import { Classes as BLUEPRINT } from '@blueprintjs/core';
import { CODE_EDITOR } from './Code/styles/class';

/**
 * EXPORTS
 */
export const CLASSES = { NS, CODE_EDITOR, ...BLUEPRINT };
