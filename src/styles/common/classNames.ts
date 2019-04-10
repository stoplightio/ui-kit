/**
 * EASY EXPORT CLASSES TO USE ELSEWHERE
 */

import { Classes as BLUEPRINT } from '@blueprintjs/core';

const NS = process.env.BLUEPRINT_NAMESPACE || 'bp3';
const CODE_EDITOR = `${NS}-code-editor`;

/**
 * EXPORTS
 */
export { NS, CODE_EDITOR, BLUEPRINT };
