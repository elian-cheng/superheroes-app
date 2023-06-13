import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockValidForm } from '../OrderCardList/OrderCardList.test';
import OrderCard from './OrderCard';
import { act } from 'react-dom/test-utils';

describe('Form card item', () => {
  let card: HTMLElement;
  const mockData = mockValidForm();

  beforeEach(() => {
    act(() => {
      render(<OrderCard key={0} index={0} {...mockData} />);
    });
    card = screen.getByRole('listitem');
  });

  it('should render the component correctly', () => {
    expect(card).toBeInTheDocument();
  });

  it('should render the card data correctly', () => {
    expect(card).toContainHTML(mockData.name);
    expect(card).toContainHTML(mockData.date);
    expect(card).toContainHTML(mockData.delivery);
    expect(card).toContainHTML(mockData.notifications);
    expect(card).toContainHTML(mockData.call);
    expect(card).toContainHTML(mockData.consent);
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(card).toContainHTML(mockData.image);
    expect(screen.getByText(/Accepted terms:/i)).toBeInTheDocument();
  });
});
