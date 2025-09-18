import diagnosesData from "../../data/diagnosesData";
import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

export default {
  getDiagnoses
};