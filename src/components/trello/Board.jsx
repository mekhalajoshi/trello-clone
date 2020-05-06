import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TrelloList from './TrelloList';
import * as dataActions from '../../redux/actions/dataActions';
import AddComponent from './AddComponent';
import '../../App.css';

const useStyles = makeStyles({
  listContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 8,
    backgroundColor: 'lightBlue',
  },
  title: {
    fontSize: 14,
  },
});
function Board() {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dataActions.getUserData());
  }, []);

  // const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const data = useSelector((state) => state.data);
  const { listIds, lists, cards } = data;

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    const start = lists[source.droppableId];
    const finish = lists[destination.droppableId];

    if (start === finish) {
      const newCardIds = Array.from(start.cardIds);

      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newList = {
        ...start,
        cardIds: newCardIds,
      };
      dispatch(dataActions.moveCardWithinList(newList));
      return;
    }

    const startCardIds = Array.from(start.cardIds);
    startCardIds.splice(source.index, 1);
    const newStart = {
      ...start,
      cardIds: startCardIds,
    };
    const finishCardIds = Array.from(finish.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      cardIds: finishCardIds,
    };
    dispatch(dataActions.moveCardBetweenLists({ newStart, newFinish }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.listContainer}>
        {/* {isAuthenticated && ( */}


        {
          listIds.map((listId) => {
            const list = lists[listId];
            const cardList = list.cardIds.map((cardId) => cards[cardId]);
            return (
              <TrelloList key={listId} list={list} cards={cardList} />
            );
          })
        }
        <AddComponent isList />
        {/* )} */}
      </div>
    </DragDropContext>

  );
}

export default Board;
