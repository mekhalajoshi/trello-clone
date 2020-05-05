import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import TrelloCard from './TrelloCard';
// import AddCard from './AddCard';
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
  },
});

function TrelloList(props) {
  const classes = useStyles();
  const { list, cards } = props;


  return (
    <div className={classes.container}>
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
            <AddComponent />
            {/* <AddCard listId={list.listId} card /> */}

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
