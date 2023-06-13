import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Form from './Form';
import { act } from 'react-dom/test-utils';
import { vi } from 'vitest';

export const mockInvalidForm = () => {
  return [
    {
      name: 'Вася',
      date: '2024-03-25',
      delivery: 'default',
      notifications: 'No',
      image: '',
      consent: 'Yes',
      call: 'Yes',
    },
    {
      name: 'Testing',
      date: '2024-03-25',
      delivery: 'Courier',
      notifications: 'No',
      image: '',
      consent: 'Yes',
      call: 'No',
    },
    {
      name: 'Testing',
      date: '2023-02-05',
      delivery: 'Express',
      notifications: 'No',
      image: '',
      consent: 'Yes',
      call: 'No',
    },
  ];
};

describe('Form', () => {
  let form: HTMLElement;
  let name: HTMLInputElement;
  let date: HTMLInputElement;
  let delivery: HTMLSelectElement;
  let image: HTMLInputElement;
  let consent: HTMLInputElement;
  let call: HTMLInputElement;
  let button: HTMLButtonElement;
  let modal: HTMLElement | null;
  const mockInvalid = mockInvalidForm();

  beforeEach(async () => {
    act(() => {
      const mock = vi.fn();
      render(<Form setFormState={mock} />);
    });
    form = screen.getByTestId('form');
    name = screen.getByRole('textbox', { name: /Name:/i });
    date = document.getElementById('date') as HTMLInputElement;
    image = document.getElementById('image') as HTMLInputElement;
    consent = document.getElementById('consent') as HTMLInputElement;
    call = screen.getByLabelText('Yes, I need a call');
    delivery = screen.getByRole('combobox');
    button = screen.getByRole('button', { name: /Submit/i });
    modal = screen.queryByText(/Your order was successfully submitted!/i);
  });

  const createCard = (
    nameValue: string,
    dateValue: string,
    deliveryValue: string
  ) => {
    userEvent.type(name, nameValue);
    fireEvent.change(date, { target: { value: dateValue } });
    fireEvent.change(delivery, { target: { value: deliveryValue } });
    fireEvent.change(image, {
      target: { files: [new File([], 'image.png', { type: 'image/png' })] },
    });
    fireEvent.click(consent);
    fireEvent.click(call);
    fireEvent.click(button);
  };

  it('should render the component correctly', () => {
    expect(form).toBeInTheDocument();
    expect(document.querySelectorAll('input').length).toBe(7);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(2);
    const radios = screen.getAllByRole('radio');
    expect(radios.length).toBe(2);
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Delivery date:')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Agree to terms & conditions')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should show validation errors when submitting the form with invalid data', async () => {
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      expect(screen.getAllByTestId('inputError')).toHaveLength(6);
    });
  });

  it('should submit the valid form', async () => {
    act(() => {
      createCard('Testing', '2025-05-14', 'Express');
    });

    await waitFor(() => {
      expect(name.value).toBe('Testing');
      expect(date.value).toBe('2025-05-14');
      expect(delivery.value).toBe('Express');
      expect(image.value).toBe('');
      expect(consent.value).toBe('on');
      expect(call.value).toBe('Yes');
    });
  });

  it('should not submit the invalid form', async () => {
    let data = mockInvalid[0];
    act(() => {
      userEvent.type(name, data.name);
      userEvent.type(date, data.date);
      userEvent.selectOptions(delivery, data.delivery);
      userEvent.upload(image, new File([data.image], 'example.png'));
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });

    data = mockInvalid[1];
    act(() => {
      name.value = '';
      userEvent.type(name, data.name);
      userEvent.clear(date);
      userEvent.selectOptions(delivery, data.delivery);
      userEvent.upload(image, new File([data.image], 'example.png'));
      userEvent.click(consent);
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });

    data = mockInvalid[2];
    act(() => {
      userEvent.clear(name);
      userEvent.type(date, data.date);
      userEvent.selectOptions(delivery, data.delivery);
      userEvent.upload(image, new File([data.image], 'example.png'));
      userEvent.click(consent);
      userEvent.click(call);
      userEvent.click(button);
    });
    await waitFor(() => {
      expect(modal).not.toBeInTheDocument();
    });
  });
});
