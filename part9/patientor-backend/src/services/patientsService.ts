import patientsData from "../../data/patientsData";
import { NonSensitivePatient } from "../types";

const getNonSensitivePatient = (): NonSensitivePatient[] => {
  return patientsData.map(({id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getNonSensitivePatient
};