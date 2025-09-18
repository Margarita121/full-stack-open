import { v1 as uuid } from 'uuid';
import patientsData from "../../data/patientsData";
import { NonSensitivePatient, Patient, NewPatient } from "../types";

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    ...entry
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatient,
  addPatient
};