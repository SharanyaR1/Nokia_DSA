// DroppedServices.js

import React from 'react';
import { useDrop } from 'react-dnd';
//import './DroppedServices.css';

const DroppedServices = ({ droppedServices }) => {
  const [, drop] = useDrop({
    accept: 'SERVICE',
  });

  return (
    <div ref={drop} className="dropped-services">
      {droppedServices.map((service) => (
        <div key={service.id} className="dropped-service">
          {service.name}
        </div>
      ))}
    </div>
  );
};

export default DroppedServices;
