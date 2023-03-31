import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";
// ...............................................................................................
const formatSpots = function (spots) {
  if (spots === 0) {
    return "no spots remaining";
  } else if (spots === 1) {
    return "1 spot remaining";
  } else {
    return `${spots} spots remaining`;
  }
};

export default function DayListItem(props) {

  let dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  })
  return (
<<<<<<< HEAD
    <li onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid="day">
=======
    <li onClick={() => props.setDay(props.name)} 
    className={dayClass}
    data-testid="day">
>>>>>>> 970c259351c982565ecf6393e7a546602fbf474d
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
// ...............................................................................................