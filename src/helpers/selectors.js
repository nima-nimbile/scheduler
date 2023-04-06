
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

export function getInterviewersForDay(state, dayName) {
  const validDayNames = state.days.map(dayObj => dayObj.name);
  if (!dayName || !validDayNames.includes(dayName)) return [];

  const todayObj = state.days.filter(dayObj => dayObj.name === dayName)[0];
  const interviewersObj = todayObj.interviewers.map(
    interId => state.interviewers[interId]
  );
  return interviewersObj;
}
