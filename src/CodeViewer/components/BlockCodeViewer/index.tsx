import * as React from 'react';

import { FAIcon } from '../../../FAIcon';
import type { IBlockCodeViewerProps } from './BlockCodeViewer';

const BlockCodeViewerComponent = React.lazy(() => import('./BlockCodeViewer'));

export const BlockCodeViewer: React.FC<IBlockCodeViewerProps> = props => (
  <React.Suspense fallback={<CodeViewerLoading />}>
    <BlockCodeViewerComponent {...props} />
  </React.Suspense>
);

const CodeViewerLoading = () => (
  <div>
    Preparing... <FAIcon icon={['fas', 'code']} size="lg" />
  </div>
);

export { IBlockCodeViewerProps };
