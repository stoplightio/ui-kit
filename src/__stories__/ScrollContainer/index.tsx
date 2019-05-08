import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IScrollContainer, ScrollContainer } from '../../ScrollContainer';

export const scrollContainerKnobs = (): IScrollContainer => ({
  autoHeight: boolean('autoHeight', false),
  autoHideTimeout: number('autoHideTimeout', 0),
  onUpdate: action('onUpdate'),
  scrollTo: text('scrollTo', ''),
  shadows: boolean('shadows', true),
});

storiesOf('ScrollContainer', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <div className="border" style={{ width: '50%', margin: '50px auto', height: 500 }}>
      <ScrollContainer {...scrollContainerKnobs()}>
        <ScrollContent />
      </ScrollContainer>
    </div>
  ));

const ScrollContent = () => {
  return (
    <div>
      <div style={{ padding: 20 }}>
        <h1>
          This is the primary heading and there should only be one of these per page
          sadassadasdsdasdaslkdmaslkdmasldkmalskdmasldmasldkamsldkamsdlkasmdlkamsdlkmsadlksamdlksamdlaskdmasldkmsakdmasldkmasdkmalskdmlaskdm
        </h1>
        <p>
          A small paragraph to <em>emphasis</em> and show <strong>important</strong> bits.
        </p>
        <a href="#ul-list" id="ul-list" />
        <ul>
          <li>This is a list item</li>
          <li>So is this - there could be more</li>
          <li>
            Make sure to style list items to:
            <ul>
              <li>Not forgetting child list items</li>
              <li>Not forgetting child list items</li>
              <li>Not forgetting child list items</li>
              <li>Not forgetting child list items</li>
            </ul>
          </li>
          <li>A couple more</li>
          <li>top level list items</li>
        </ul>
        <p>
          Don't forget <strong>Ordered lists</strong>:
        </p>
        <ol>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>
            Aliquam tincidunt mauris eu risus.
            <ol>
              <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
              <li>Aliquam tincidunt mauris eu risus.</li>
            </ol>
          </li>
          <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
          <li>Aliquam tincidunt mauris eu risus.</li>
        </ol>
        <a href="#sub-heading2" id="sub-heading2" />
        <h2>A sub heading which is not as important as the first, but is quite imporant overall</h2>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
          tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
          semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>

        <a href="#sub-heading3" id="sub-heading3" />
        <h3>A sub heading which is not as important as the second, but should be used with consideration</h3>
        <p>
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
          tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
          semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
        </p>
      </div>
    </div>
  );
};
