import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import { useEffect } from "react";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  useEffect(() => {
    
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    
    if (!props.interview && mode === SHOW) {
      transition(EMPTY);
    }

  }, [mode, transition, props.interview])

  return (<article className="appointment">
    <Header time={props.time} />
    {/* {props.interview ? <Show student={props.student} interviewer={props.interviewer}/> : <Empty/>} */}
    {mode === EMPTY && <Empty onAdd={() =>  {return transition(CREATE);} }/>}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
      
    )}
      {mode === CREATE &&
        <Form
          name={props.name}
          value={props.value}
          interviewers={[]}
          onCancel={back}
        />}

  </article>)
}
