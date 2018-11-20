/**
 * Per this suggestion re async testing of useEffect:
 * https://github.com/facebook/react/issues/14050#issuecomment-438173736
 *
 * If they ever fix that issue, we might be able to remove this mock.
 */

const React = require.requireActual('react');
module.exports = { ...React, useEffect: React.useLayoutEffect };
