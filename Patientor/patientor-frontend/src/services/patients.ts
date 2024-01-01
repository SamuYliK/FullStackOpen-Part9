import axios from "axios";
import { Patient, PatientFormValues, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async ({ id }: { id: string | undefined }) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async ({ entry, id }: { entry: EntryWithoutId, id: string | undefined } ) => {
  const { data } = await axios.post<EntryWithoutId>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  return data;
};

export default {
  getAll, create, getById, addEntry
};

