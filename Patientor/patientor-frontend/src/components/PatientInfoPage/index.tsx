import { useMatch } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient, Diagnosis, EntryWithoutId } from "../../types";
import Gender from "./Gender";
import EntryForm from "./EntryForm";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";
import { Box, Button } from '@mui/material';
import axios from "axios";
import patientService from '../../services/patients';
import Notification from "./Notification";

interface Props {
    setPatients: React.Dispatch<React.SetStateAction<Patient[]>>
  }

const PatientInfoPage = ({ setPatients } : Props) => {
    const match = useMatch('/patients/:id');
    const [patient, setPatient] = useState<Patient>();
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState<string>();
        
    useEffect(() => {
        const checkInfo = async () => {
            if (match){
                const data = await patientService.getById({ id: match.params.id });
                const diagData = await diagnosesService.getAll();
                setPatient(data);
                setDiagnoses(diagData);
            }
        };
        void checkInfo();
    }, [match]);
        
    if(typeof patient === 'undefined'){
        return <p>Checking for patient info...</p>;
    } 

    if(typeof diagnoses === 'undefined'){
        return <p>Loading diagnoses...</p>;
    }

    const changeVisibility = () => {
        setVisible(!visible);
    };

  const submitNewEntry = async (entry: EntryWithoutId) => {
    try {
        await patientService.addEntry({ entry, id: match?.params.id });
        const data = await patientService.getById({ id: match?.params.id });
        setPatient(data);
        const patients = await patientService.getAll();
        setPatients(patients);
    } catch(error: unknown){
        if (axios.isAxiosError(error)) {
            if (error?.response?.data && typeof error?.response?.data === "string") {
              const message = error.response.data.replace('Something went wrong. Error: ', '');
              console.error(message);
              setError(message);
            } else {
                console.error("Unrecognized axios error");
                setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", error);
            setError("Unknown error");
          }
          setTimeout(() => setError(''), 4000);
    }
    };

    return (
        <div>
            <h2>
                {patient.name} <Gender gender={patient.gender}/>
            </h2>
            <p>
                ssn: {patient.ssn}
                <br></br>
                occupation: {patient.occupation}
            </p>
            <Notification notification={error} />
            <Button 
                variant="contained"
                color="primary"
                onClick={changeVisibility}
                sx={{ display: visible ? 'none' : "" }}
            >
                ADD NEW ENTRY
            </Button>
            <Box 
                sx={{ border: 1, padding: 1, marginBottom: 1, borderStyle: "dashed", display: visible ? '' : 'none' }}
            >
                <EntryForm 
                visible={visible} 
                changeVisibility={changeVisibility} 
                onSubmit={submitNewEntry} 
                setError={setError}
                diagnoses={diagnoses}            
                />
            </Box>
            <h3>Entries:</h3>
            <div>
                {patient.entries.map(e => 
                    <Box key={e.id} sx={{ border: 1, borderRadius: '7px', padding: 1, marginBottom: 1 }}>
                        <EntryDetails key={e.id} entry={e} />
                        <ul>
                            {e.diagnosisCodes?.map(code => 
                                diagnoses?.filter(diag => 
                                    diag.code === code
                                )?.map(fullDiagnose =>
                                    <li key={fullDiagnose.code}>   
                                        {fullDiagnose.code} {fullDiagnose.name}
                                    </li>)
                            )}
                        </ul>
                    </Box>
                )}
            </div>
        </div>
    );
};

export default PatientInfoPage;