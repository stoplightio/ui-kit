import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { ToastType } from 'react-toastify';
import { Box } from '../../Box';
import { toast, Toaster } from '../../Toaster';

storiesOf('Miscellaneous:Toaster', module).add('with defaults', () => (
  <Box>
    <Toaster />
    <button onClick={() => toast({ title: 'Info', body: 'Body' }, { type: ToastType.INFO })}>Info!</button>
    <button onClick={() => toast({ title: 'Warning', body: 'Body' }, { type: ToastType.WARNING })}>Warning!</button>
    <button onClick={() => toast({ title: 'Error', body: 'Body' }, { type: ToastType.ERROR })}>Error!</button>
    <button onClick={() => toast({ title: 'Success', body: 'Body' }, { type: ToastType.SUCCESS })}>Success!</button>
    <button onClick={() => toast({ title: 'Default', body: 'Body' }, { type: ToastType.DEFAULT })}>Default!</button>
  </Box>
));
