import { parseCode } from '../utils/parseCode';
import { INITIAL_RENDER_THRESHOLD } from './consts';
import { isParseCodeRequestMessage, ParseCodeErrorResponse, ParseCodeSuccessResponse } from './messages';

declare const self: DedicatedWorkerGlobalScope;

self.addEventListener('message', e => {
  if (!isParseCodeRequestMessage(e)) return;

  const {
    data: { code, language, showLineNumbers },
  } = e;

  try {
    if (code.length > INITIAL_RENDER_THRESHOLD) {
      // let's get some initial content in, so the UX is not hampered too much
      const msg: ParseCodeSuccessResponse = {
        error: null,
        nodes: parseCode(code.slice(0, INITIAL_RENDER_THRESHOLD), language, showLineNumbers),
      };

      self.postMessage(msg);
    }

    const msg = {
      error: null,
      nodes: parseCode(code, language, showLineNumbers),
    };

    self.postMessage(msg);
  } catch (ex) {
    const msg: ParseCodeErrorResponse = {
      error: ex.message,
      nodes: null,
    };

    self.postMessage(msg);
  }
});
