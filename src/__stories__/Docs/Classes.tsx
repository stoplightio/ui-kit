import * as React from 'react';

import map = require('lodash/map');
import range = require('lodash/range');

import * as UI from '../../components';

const ColorRows = ({ color }: { color: string }) => (
  <tr>
    <td>{color}</td>
    <td>
      <div className={`w-5 h-5 bg-${color} m-auto rounded-full shadow`} />
    </td>
    {map(range(1, 10), num => (
      <td>
        <div className={`w-5 h-5 bg-${color}-${num} m-auto rounded-full shadow`} />
      </td>
    ))}
  </tr>
);

const Code = (props: any) => <pre className="inline text-sm bg-warning-2 px-1">{props.children}</pre>;

export default () => (
  <div className="m-20">
    <div>
      Here are some important classnames and their displays! For the rest look through the Tailwind doucmentation at{' '}
      <a href="https://next.tailwindcss.com/">https://next.tailwindcss.com/</a>.
    </div>
    <div className="mt-5 mb-10">
      <div>
        This the stoplight color pallete that comes with ui-kit. Colors can be used with <Code>text-color</Code>,{' '}
        <Code>bg-color</Code>, or
        <Code>border-color</Code>. To use a shade of a color incluide the shade <Code>text-color-1</Code>
      </div>

      <UI.Table condensed={true}>
        <thead>
          <tr>
            <th>Colors</th>
            <th>Default</th>
            {map(range(1, 10), num => (
              <th>{num}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <ColorRows color="gray" />
          <ColorRows color="lighten" />
          <ColorRows color="darken" />

          <ColorRows color="info" />
          <ColorRows color="success" />
          <ColorRows color="warning" />
          <ColorRows color="danger" />
          <ColorRows color="primary" />
          <ColorRows color="secondary" />
          <tr>
            <td>white</td>
            <td>
              <div className="w-5 h-5 bg-white m-auto rounded-full shadow" />
            </td>
          </tr>
          <tr>
            <td>black</td>
            <td>
              <div className="w-5 h-5 bg-black m-auto rounded-full shadow" />
            </td>
          </tr>
        </tbody>
      </UI.Table>
      <div className="w-5 h-5 bg-red" />
    </div>

    <div className="flex mb-10">
      <div className="flex-1">
        <div>FONT SIZE</div>
        <div className="text-xs mr-2">text-xs</div>
        <div className="text-sm mr-2">text-sm</div>
        <div className="text-base mr-2">text-base</div>
        <div className="text-lg mr-2">text-lg</div>
        <div className="text-xl mr-2">text-xl</div>
        <div className="text-2xl mr-2">text-2xl</div>
        <div className="text-3xl mr-2">text-3xl</div>
        <div className="text-4xl mr-2">text-4xl</div>
        <div className="text-5xl mr-2">text-5xl</div>
        <div className="text-6xl mr-2">text-6xl</div>
      </div>

      <div className="flex-1">
        <div>FONT WEIGHT</div>
        <div className="font-hairline mr-2">font-hairline</div>
        <div className="font-thin mr-2">font-thin</div>
        <div className="font-light mr-2">font-light</div>
        <div className="font-normal mr-2">font-normal</div>
        <div className="font-medium mr-2">font-medium</div>
        <div className="font-semibold mr-2">font-semibold</div>
        <div className="font-bold mr-2">font-bold</div>
        <div className="font-extrabold mr-2">font-extrabold</div>
        <div className="font-black mr-2">font-black</div>
      </div>

      <div className="flex-1">
        <div>FONT FAMILY</div>
        <div className="font-sans">font-sans</div>
        <div className="font-serif">font-serif</div>
        <div className="font-mono">font-mono</div>
      </div>
    </div>

    <div className="flex mb-10">
      <div className="flex-1">
        <div>BORDER WIDTH</div>
        <div className="border mb-2 w-20">border</div>
        <div className="border-2 mb-2 w-20">border-2</div>
        <div className="border-4 mb-2 w-20">border-4</div>
        <div className="border-8 mb-2 w-20">border-8</div>
      </div>

      <div className="flex-1">
        <div>BORDER RADIUS</div>
        <div className="border rounded-sm mb-2 w-32 px-2">rounded-sm</div>
        <div className="border rounded mb-2 w-32 px-2">rounded</div>
        <div className="border rounded-lg mb-2 w-32 px-2">rounded-lg</div>
        <div className="border rounded-full mb-2 w-32 px-2">rounded-full</div>
        <div className="border rounded-none mb-2 w-32 px-2">rounded-none</div>
      </div>

      <div className="flex-1">
        <div>BOX SHADOW</div>
        <div className="border shadow mb-2 w-32 px-2">shadow</div>
        <div className="border shadow-md mb-2 w-32 px-2">shadow-md</div>
        <div className="border shadow-lg mb-2 w-32 px-2">shadow-lg</div>
        <div className="border shadow-inner mb-2 w-32 px-2">shadow-inner</div>
        <div className="border shadow-outline mb-2 w-32 px-2">shadow-outline</div>
        <div className="border shadow-none mb-2 w-32 px-2">shadow-none</div>
      </div>
    </div>

    <div className="flex mb-10">
      <div className="flex-1">
        <div>OPACITY</div>
        <div className="mb-2 opacity-100">opacity-100</div>
        <div className="mb-2 opacity-75">opacity-75</div>
        <div className="mb-2 opacity-50">opacity-50</div>
        <div className="mb-2 opacity-25">opacity-25</div>
        <div className="mb-2">opacity-0</div>
      </div>

      <div className="flex-1">
        <div>LINE HEIGHT</div>
        <div className="border mb-2 px-1 w-1/2 leading-tight">leading-tight</div>
        <div className="border mb-2 px-1 w-1/2 leading-snug">leading-snug</div>
        <div className="border mb-2 px-1 w-1/2 leading-normal">leading-normal</div>
        <div className="border mb-2 px-1 w-1/2 leading-relaxed">leading-relaxed</div>
        <div className="border mb-2 px-1 w-1/2 leading-loose">leading-loose</div>
      </div>

      <div className="flex-1">
        <div>LETTER SPACING</div>
        <div className="mb-2 tracking-tighter">tracking-tighter</div>
        <div className="mb-2 tracking-tight">tracking-tight</div>
        <div className="mb-2 tracking-normal">tracking-normal</div>
        <div className="mb-2 tracking-wide">tracking-wide</div>
        <div className="mb-2 tracking-wider">tracking-wider</div>
        <div className="mb-2 tracking-widest">tracking-widest</div>
      </div>
    </div>
  </div>
);
