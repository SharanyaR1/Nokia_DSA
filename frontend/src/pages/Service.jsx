// Service.js

import React from 'react';
import { useDrag } from 'react-dnd';
import './Service.css';

const Service = ({ service, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'SERVICE',
    item: { service },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onDrop(item.service);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`service ${isDragging ? 'dragging' : ''}`}>
      {service.name}
    </div>
  );
};

export default Service;
