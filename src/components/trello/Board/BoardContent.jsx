import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import AddComponent from '../AddComponent';
import useStyles from './style';
import InnerList from './InnerList';

const BoardContent = (props) => {
  const {
    onDragEnd, isAuthenticated, listIds, lists, cards,
  } = props;
  const classes = useStyles();

  const innerList = useMemo(
    () => <InnerList listIds={listIds} lists={lists} cards={cards} />, [listIds, lists, cards],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <div
            className={classes.listContainer}
            ref={provided.innerRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
          >
            {isAuthenticated && (
              <>
                {innerList}
                {provided.placeholder}
                <AddComponent isList />
              </>
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

BoardContent.propTypes = {
  onDragEnd: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  listIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  lists: PropTypes.objectOf(PropTypes.any).isRequired,
  cards: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default BoardContent;
