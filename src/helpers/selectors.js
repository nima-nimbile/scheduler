
export function getAppointmentsForDay(state, day) {
  if(!state.days){
    return []
  }
  const dayResult = state.days.filter(d => d.name === day)[0];
  if(!dayResult){
    return [];
  }
  let apointments = []
  for(const id of dayResult.appointments){
    const appointmentObj = state.appointments[id];
    apointments.push(appointmentObj);
  }
  return apointments;
  
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
}