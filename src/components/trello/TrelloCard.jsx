/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardDetails from './CardDetails';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function TrelloCard(props) {
  const { card, index } = props;
  const [localCard] = useState(card);

  // Material UI
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();


  // console.log(card.cardId);
  // TODO add local state to store the card
  return (
    <div>
      <Draggable draggableId={card.cardId} index={index}>
        {(provided) => (
          <Card
            className={classes.root}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <CardActionArea onClick={handleClickOpen}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {card.cardId}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardDetails
              open={open}
              handleClose={handleClose}
              card={localCard}
            />
          </Card>
        )}
      </Draggable>
    </div>

  );
}

TrelloCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};
export default TrelloCard;
