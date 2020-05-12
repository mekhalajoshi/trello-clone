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
    marginBottom: 10,
    //backgroundColor: 'pink',
    //height:70,
    // padding: 5,
  },
  title: {
    fontSize: 14,
    // padding: 5
    wordWrap:'word-break',
  },
  card_content:{
    padding: '5px !important',
  },
  container:{
    padding:0,
  }
});
function TrelloCard(props) {
  const classes = useStyles();
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


  // console.log(card.cardId);
  // TODO add local state to store the card
  return (
    <div className={classes.container}>
      <Draggable draggableId={card.cardId} index={index}>
        {(provided) => (
          <Card
            className={classes.root}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
          <div onClick={handleClickOpen}>
            <CardContent className={classes.card_content}>
              <Typography className={classes.title} color="textSecondary">
                {card.cardTitle}
              </Typography>
            </CardContent>
          </div> 
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
