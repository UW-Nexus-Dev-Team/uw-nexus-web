import { SET_PROJECT_NAME, SET_PROJECT_DESC, SET_TEAM_SIZE, SET_PROJECT_DUR, SET_PROJECT_STATUS, ADD_PROJECT_CATEG, REMOVE_PROJECT_CATEG, CLEAR_DATA, INCREASE_STEP, DECREASE_STEP } from "./createProjectTypes";
import { ADD_ROLE, ADD_SKILL, ADD_RESPONSIBILITY, ADD_LOCATION, SET_ERROR_MSG } from "./createProjectTypes";

export const setProjName = (projName) => {
  return {
    type: SET_PROJECT_NAME,
    payload: projName
  }
}

export const setProjDesc = (desc) => {
  return {
    type: SET_PROJECT_DESC,
    payload: desc
  }
}

export const setTeamSize = (teamSize) => {
  return {
    type: SET_TEAM_SIZE,
    payload: teamSize
  }
}

export const setProjDur = (duration) => {
  return {
    type: SET_PROJECT_DUR,
    payload: duration,
  }
}

export const setProjStatus = (status) => {
  return {
    type: SET_PROJECT_STATUS,
    payload: status
  }
}

export const addProjCategory = (category) => {
  return {
    type: ADD_PROJECT_CATEG,
    payload: category
  }
}

export const removeProjCategory = (category) => {
  return {
    type: REMOVE_PROJECT_CATEG,
    payload: category
  }
}

export const addRole = (role) => {
  return {
    type: ADD_ROLE,
    payload: role
  }
}

export const addSkill = (skill) => {
  return {
    type: ADD_SKILL,
    payload: skill
  }
}

export const addResp = (resp) => {
  return {
    type: ADD_RESPONSIBILITY,
    payload: resp
  }
}

export const addLocation = (location) => {
  return {
    type: ADD_LOCATION,
    payload: location
  }
}

export const clearAll = () => {
  return {
    type: CLEAR_DATA,
  }
}

export const setErrorMsg = (msg) => {
  return {
    type: SET_ERROR_MSG,
    payload: msg
  }
}

export const increaseStep = () => {
  return {
    type: INCREASE_STEP,
  }
}

export const decreaseStep = () => {
  return {
    type: DECREASE_STEP,
  }
}