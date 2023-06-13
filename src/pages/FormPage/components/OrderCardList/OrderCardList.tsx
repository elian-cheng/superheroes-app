import React from 'react';
import { IFormData } from '../Form/Form';
import OrderCard from '../OrderCard/OrderCard';

interface IOrderCardList {
  ordersData: IFormData[];
}

const OrderCardList: React.FC<IOrderCardList> = ({ ordersData }) => {
  return (
    <ul className="orders__list grid">
      {ordersData.map((order: IFormData, index: number) => {
        return (
          <OrderCard
            key={index}
            index={ordersData.length - index}
            name={order.name}
            date={order.date}
            delivery={order.delivery}
            call={order.call}
            notifications={order.notifications}
            image={order.image}
            consent={order.consent}
          />
        );
      })}
    </ul>
  );
};

export default OrderCardList;
