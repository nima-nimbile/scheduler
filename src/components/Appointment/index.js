import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import { useVisualMode } from "hooks/useVisualMode";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const EDITING = 'EDITING';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    })
  }


  function remove() {
    transition(DELETING,true);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
  }
  function edit() {
    transition(EDITING);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === EMPTY && <Empty onAdd={() => { return transition(CREATE); }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={remove}
          onEdit={edit}
        />
      )}
       {mode === EDITING &&
        <Form 
          name={props.name ? props.name : props.interview.student}
          value={props.value ? props.value: props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
      {mode === CREATE &&
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          bookInterview={props.bookInterview}
        />}
    </article>
  )
}
