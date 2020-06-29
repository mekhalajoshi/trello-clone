/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard';
import '../../App.css';
import AddComponent from './AddComponent';
// import CardDetails from './CardDetails';

const useStyles = makeStyles({
  container: {
    backgroundColor: '#ebecf0',
    marginRight: 8,
    padding: 8,
    borderRadius: 3,
    width: 272,
    height: '100%',

  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    padding: '5px 5px',

  },
});

function TrelloList(props) {
  const classes = useStyles();
  const { list, cards, index } = props;


  return (
    <Draggable draggableId={list.listId} index={index}>
      {(provided) => (
        <div
          className={classes.container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={classes.title}>{list.listName}</div>
          <Droppable droppableId={list.listId} type="card">
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
                <AddComponent currentList={list} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}


TrelloList.propTypes = {
  list: PropTypes.objectOf(PropTypes.any).isRequired,
  cards: PropTypes.arrayOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
export default TrelloList;
