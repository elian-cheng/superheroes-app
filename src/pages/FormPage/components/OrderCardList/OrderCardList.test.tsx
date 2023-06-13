import React from 'react';
import { render, screen, within } from '@testing-library/react';
import OrderCardList from './OrderCardList';
import { IFormData } from '../Form/Form';
import { act } from 'react-dom/test-utils';

export const mockValidForm = () => {
  return {
    name: 'Testing',
    date: '2024-05-09',
    delivery: 'Express',
    notifications: 'No',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    consent: 'Yes',
    call: 'Yes',
  };
};

describe('Order card list', () => {
  const singleItem = mockValidForm() as IFormData;
  const multipleItems = new Array(3).fill(singleItem) as IFormData[];
  let list: HTMLElement;
  let ordersData: IFormData[] = [singleItem];

  const renderCardList = () => {
    act(() => {
      render(<OrderCardList ordersData={ordersData} />);
    });
  };

  it('should render the component correctly', () => {
    renderCardList();
    list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('should render the correct number of card items', () => {
    ordersData = multipleItems;
    renderCardList();
    list = screen.getByRole('list');
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(ordersData.length);
  });
});
