import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
const [student, setStudent] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);
const reset = function(){
  setStudent("")
setInterviewer(null)
}
const cancel = function() {
  reset();
  props.onCancel()
}
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setStudent(event.target.value)}
        value={student}
        data-testid="student-name-input"
      />
    </form>
    <InterviewerList 
     interviewers={props.interviewers} interviewer={interviewer} onChange={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  )
}