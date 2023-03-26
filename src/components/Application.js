
import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import axios from "axios";
import "components/Application.scss";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";



// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };

export default function Application(props) {
  
  // const setDays = (days) => setState(prev => ({ ...prev, days }));
 
  useEffect(() => {
    const dayURL = "/api/days";
    const appointmentURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) =>{
      console.log("Inter", all[2].data)
      setState(prev=>({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    })
  },[]);
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule  = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state, state.day);
return (
  <Appointment
  {...appointment} 
  key={appointment.id} 
  id={appointment.id} 
  time={appointment.time} 
  interview={interview}
  interviewers={interviewers}
  />
);
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  value={state.day}
  onChange={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" /> 
      </section>
    </main>
  );
}
