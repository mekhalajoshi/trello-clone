import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard';
import '../../App.css';

function TrelloList(props) {
  const { list, cards } = props;
  // console.log(cards);

  return (
    <div className="column trello_list ">
      {list.listName}
      <Droppable droppableId={list.listId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
          >
            {' '}
            {' '}
            {cards.map(
              (cardId, index) => <TrelloCard index={index} key={cardId.cardId} card={cardId} />,
            )}
            {provided.placeholder}
            <button type="button" className="add_button button">+ Add another card</button>
          </div>
        )}
      </Droppable>
    </div>
  );
}


TrelloList.propTypes = {
  list: PropTypes.objectOf(PropTypes.any).isRequired,
  cards: PropTypes.arrayOf(PropTypes.any).isRequired,
};
export default TrelloList;
