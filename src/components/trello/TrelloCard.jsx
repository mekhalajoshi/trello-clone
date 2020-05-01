/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

function TrelloCard(props) {
  const { card, index } = props;
  return (
    <Draggable draggableId={card.cardId} index={index}>
      {(provided) => (
        <div
          className="trello_card card "
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {card.cardTitle}
        </div>
      )}
    </Draggable>
  );
}

TrelloCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
export default TrelloCard;
