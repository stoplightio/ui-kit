/**
 * EASY EXPORT CLASSES TO USE ELSEWHERE
 */

const NS = process.env.BLUEPRINT_NAMESPACE || 'bp3';

import { Classes as BLUEPRINT } from '@blueprintjs/core';

/**
 * EXPORTS
 */

export const Classes = { NS, ...BLUEPRINT, CODE_EDITOR: `${NS}-code-editor` };
