import * as React from 'react';

import { boolean, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IScrollContainer, ScrollContainer } from '../../ScrollContainer';

export const scrollContainerKnobs = (): IScrollContainer => ({
  shadows: boolean('shadows', true),
});

storiesOf('ScrollContainer', module)
  .addDecorator(withKnobs)
  .add('default autogrow', () => (
    <div className="border" style={{ height: '98vh' }}>
      <ScrollContainer {...scrollContainerKnobs()}>
        <ScrollContent />
      </ScrollContainer>
    </div>
  ))
  .add('container max-height', () => (
    <div className="border" style={{ height: '98vh', maxHeight: 500 }}>
      <ScrollContainer {...scrollContainerKnobs()}>
        <ScrollContent />
      </ScrollContainer>
    </div>
  ))
  .add('sibling elem, fill remaining', () => (
    <div className="border-2 flex flex-col" style={{ height: '98vh', maxHeight: 500, margin: 50 }}>
      <div style={{ height: 250, margin: 20, background: 'pink' }}>
        remaining content should only fill the rest of the space
      </div>
      <ScrollContainer {...scrollContainerKnobs()}>
        <ScrollContent />
      </ScrollContainer>
    </div>
  ))

  // TODO FIXME
  .add('broken: sibling text, fill remaining', () => (
    <div className="border-2" style={{ height: '98vh', maxHeight: 500, margin: 50 }}>
      This edgecase does not work, when the div contains text directly next to the scroll container the height is
      incorrect
      <ScrollContainer {...scrollContainerKnobs()}>
        <ScrollContent />
      </ScrollContainer>
    </div>
  ));

const ScrollContent = () => {
  return (
    <div style={{ padding: 40 }}>
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
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>

      <a href="#sub-heading3" id="sub-heading3" />
      <h3>A sub heading which is not as important as the second, but should be used with consideration</h3>
      <p>
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor
        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean
        ultricies mi vitae est. Mauris placerat eleifend leo.
      </p>
    </div>
  );
};
