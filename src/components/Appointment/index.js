import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Error from "./Error";
import Confirm from "./Confirm";
import { useVisualMode } from "hooks/useVisualMode";

// ...............................................................................................
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = 'SAVING';
const DELETING = 'DELETING';
const EDITING = 'EDITING';
const CONFIRM = "CONFIRM";
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

// ...............................................................................................
export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // ...............................................................................................save
  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW)
    })
      .catch(error => transition(ERROR_SAVE, true));
  }
  // ...............................................................................................remove

  function remove() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }
  // ...............................................................................................edit

  function edit() {
    transition(EDITING);
  }
  // ...............................................................................................confirmation
  function confirmation() {
    transition(CONFIRM);
  }

  return (
    <article className="appointment" data-testid="appointment" >
      <Header time={props.time} />
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={remove}
          onCancel={back}
          message="Are you sure you would like to delete?"
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => { return transition(CREATE); }} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => confirmation()}
          onEdit={edit}
        />
      )}
      {mode === EDITING && (
        <Form
          name={props.name ? props.name : props.interview.student}
          value={props.value ? props.value : props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          bookInterview={props.bookInterview}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="There was an error saving your appointment"
          onClose={back}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="There was an error deleting your appointment"
          onClose={back}
        />
      )}
    </article>
  )
}
// ...............................................................................................
