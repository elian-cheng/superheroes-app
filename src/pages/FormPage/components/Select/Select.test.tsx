import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../Form/Form';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';

describe('Select', () => {
  let delivery: HTMLSelectElement;
  let submitBtn: HTMLButtonElement;

  beforeEach(() => {
    act(() => {
      const mock = vi.fn();
      render(<Form setFormState={mock} />);
    });
    delivery = screen.getByRole('combobox');
    submitBtn = screen.getByText(/Submit/i);
  });

  it('should render the component correctly', () => {
    expect(delivery).toBeInTheDocument();
    expect(delivery.value).toBe('default');
    expect(document.querySelectorAll('option').length).toBe(4);
  });

  it('should produce errors with the incorrect select', async () => {
    act(() => {
      userEvent.click(submitBtn);
    });
    const errorMessage = await screen.findByTestId('deliverySelectError');
    expect(errorMessage).toBeInTheDocument();

    expect(errorMessage.textContent).toBe('This field is required');
  });
});
