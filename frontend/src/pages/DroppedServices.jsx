import React from 'react';
import { useDrop } from 'react-dnd';
import Service from './Service';

const DroppedServices = ({ droppedServices, onRemove }) => {
  const [, drop] = useDrop({
    accept: 'SERVICE',
    drop: (item, monitor) => {
      // Check if the service was dropped outside the container
      if (!monitor.didDrop()) {
        onRemove(item.service); // Remove the service from the list
      }
    },
  });

  return (
    <div ref={drop} className="dropped-services">
      {droppedServices.map((service) => (
        <Service key={service.id} service={service} onDrop={onRemove} />
      ))}
    </div>
  );
};

export default DroppedServices;

