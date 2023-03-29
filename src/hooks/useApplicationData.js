import { useReducer, useEffect } from 'react';
import axios from 'axios';
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from 'reducers/application';


export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const dayURL = "/api/days";
    const appointmentURL = "/api/appointments";
    const interviewersURL = "/api/interviewers";
    Promise.all([
      axios.get(dayURL),
      axios.get(appointmentURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      dispatch({
      type: SET_APPLICATION_DATA,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data
      });
    });
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day: day });

  
  function bookInterview(id, interview) {

    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    
    const url = `/api/appointments/${id}`;
    return axios.put(url, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, id: id, interview: interview });
    })
  }

  function cancelInterview(id) {

    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    
    const url = `/api/appointments/${id}`;
    return axios.delete(url).then(() => {
      dispatch({ type: SET_INTERVIEW, id: id, interview: null });
    });
  }
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
}

