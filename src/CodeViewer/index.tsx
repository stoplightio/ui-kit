import * as React from 'react';

import { FAIcon } from '../FAIcon';
import type { ICodeViewerProps } from './CodeViewer';

const CodeViewerComponent = React.lazy(() => import('./CodeViewer'));

export const CodeViewer: React.FC<ICodeViewerProps> = props => (
  <React.Suspense fallback={<CodeViewerLoading />}>
    <CodeViewerComponent {...props} />
  </React.Suspense>
);

const CodeViewerLoading = () => (
  <div>
    Preparing... <FAIcon icon={['fas', 'code']} size="lg" />
  </div>
);

export { ICodeViewerProps };
