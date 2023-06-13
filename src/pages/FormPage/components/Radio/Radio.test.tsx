import React from 'react';
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import Radio from './Radio';
import { vi } from 'vitest';

describe('Radio', () => {
  const validationRules = { required: true };
  const register = vi.fn();
  const error = undefined;

  it('should render ther component correctly', () => {
    render(
      <Radio
        validationRules={validationRules}
        register={register}
        error={error}
      />
    );
    expect(
      screen.getByText('Do you need an order confirmation call?')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Yes, I need a call')).toBeInTheDocument();
    expect(screen.getByLabelText("No, don't call me")).toBeInTheDocument();
  });

  it('should handle changes correctly', async () => {
    act(() => {
      render(
        <Radio
          validationRules={validationRules}
          register={register}
          error={error}
        />
      );
    });
    const yesRadio = screen.getByLabelText('Yes, I need a call');
    const noRadio = screen.getByLabelText("No, don't call me");

    act(() => {
      fireEvent.click(yesRadio);
    });

    await waitFor(() => {
      expect(yesRadio).toBeChecked();
      expect(noRadio).not.toBeChecked();
    });
  });
});
