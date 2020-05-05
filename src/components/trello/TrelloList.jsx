import React from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard';
import AddCard from './AddCard';
import '../../App.css';
// import CardDetails from './CardDetails';

function TrelloList(props) {
  const { list, cards } = props;


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
              (cardId, index) => (
                <TrelloCard card={cardId} index={index} key={cardId.cardId} />
              ),
            )}
            {provided.placeholder}
            <AddCard listId={list.listId} card />

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
