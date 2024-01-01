import React, { useState } from "react";
import { Diagnosis, Entry, HealthCheckRating, EntryWithoutId } from "../../types";
import { TextField, Button, Box, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel, Select, MenuItem, SelectChangeEvent, InputLabel, NativeSelect } from "@mui/material";

interface Props {
    visible: boolean;
    changeVisibility: () => void;
    onSubmit: (entry: EntryWithoutId) => void;
    setError: React.Dispatch<React.SetStateAction<string | undefined>>;
    diagnoses: Diagnosis[];
  }

const EntryForm = ({ visible, changeVisibility, onSubmit, setError, diagnoses }: Props) => {
    const [typeValue, setTypeValue] = useState<Entry["type"]>("HealthCheck");
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [type, setType] = useState<Entry["type"]>();
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

    // type "HealthCheck" - specific fields.
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

    // type "OccupationalHealthcare" - specific fields.
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

    // type "Hospital" - specific fields.
    const [dischargeDate, setDischargeDate] = useState('');
    const [dischargeCriteria, setDischargeCriteria] = useState('');
    
    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        switch (type) {
            case "HealthCheck":
                if (description === '' || date === '' || specialist === ''){
                    setError('Please fill in all mandatory fields.');
                    setTimeout(() => {
                        setError('');
                    }, 4000);
                    break;
                } else {
                    const healthCheckEntry = {
                        description,
                        date,
                        specialist,
                        healthCheckRating,
                        diagnosisCodes,
                        type
                    };
                    onSubmit(healthCheckEntry);
                    setDescription('');
                    setDate('');
                    setSpecialist('');
                    setHealthCheckRating(0);
                    setDiagnosisCodes([]);
                    setType(undefined);
                    setEmployerName('');
                    setSickLeaveStartDate('');
                    setSickLeaveEndDate('');
                    setDischargeDate('');
                    setDischargeCriteria('');
                    setTypeValue("HealthCheck");
                    changeVisibility();
                    break;
                }
            case "Hospital":
                if (description === '' || date === '' || specialist === '' || dischargeDate === '' || dischargeCriteria === ''){
                    setError('Please fill in all mandatory fields.');
                    setTimeout(() => {
                        setError('');
                    }, 4000);
                    break;
                } else {
                    const hospitalEntry = {
                        description,
                        date,
                        specialist,
                        diagnosisCodes,
                        type,
                        discharge: {
                            date: dischargeDate,
                            criteria: dischargeCriteria
                        }
                    };
                    onSubmit(hospitalEntry);
                    setDescription('');
                    setDate('');
                    setSpecialist('');
                    setHealthCheckRating(0);
                    setDiagnosisCodes([]);
                    setType(undefined);
                    setEmployerName('');
                    setSickLeaveStartDate('');
                    setSickLeaveEndDate('');
                    setDischargeDate('');
                    setDischargeCriteria('');
                    setTypeValue("HealthCheck");
                    changeVisibility();
                    break;
                }
            case "OccupationalHealthcare":
                if (description === '' || date === '' || specialist === '' || employerName === ''){
                    setError('Please fill in all mandatory fields.');
                    setTimeout(() => {
                        setError('');
                    }, 4000);
                    break;
                } else {
                    if(sickLeaveStartDate.length === 0 && sickLeaveEndDate.length !== 0){
                        setError('Sick leave needs also starting date.');
                        setTimeout(() => {
                            setError('');
                        }, 4000);
                        break;
                    }
                    if(sickLeaveStartDate.length !== 0 && sickLeaveEndDate.length === 0) {
                        setError('Sick leave needs also ending date.');
                        setTimeout(() => {
                            setError('');
                        }, 4000);
                        break;
                    }
                    if(sickLeaveStartDate.length === 0 && sickLeaveEndDate.length === 0) {
                        const occupationalHealthCareEntry = {
                            description,
                            date,
                            specialist,
                            diagnosisCodes,
                            type,
                            employerName
                        };
                        onSubmit(occupationalHealthCareEntry);
                        setDescription('');
                        setDate('');
                        setSpecialist('');
                        setHealthCheckRating(0);
                        setDiagnosisCodes([]);
                        setType(undefined);
                        setEmployerName('');
                        setSickLeaveStartDate('');
                        setSickLeaveEndDate('');
                        setDischargeDate('');
                        setDischargeCriteria('');
                        setTypeValue("HealthCheck");
                        changeVisibility();
                        break;
                    } else {
                        const occupationalHealthCareEntry = {
                            description,
                            date,
                            specialist,
                            diagnosisCodes,
                            type,
                            employerName,
                            sickLeave: {
                                startDate: sickLeaveStartDate,
                                endDate: sickLeaveEndDate
                            }
                        };
                        onSubmit(occupationalHealthCareEntry);
                        setDescription('');
                        setDate('');
                        setSpecialist('');
                        setHealthCheckRating(0);
                        setDiagnosisCodes([]);
                        setType(undefined);
                        setEmployerName('');
                        setSickLeaveStartDate('');
                        setSickLeaveEndDate('');
                        setDischargeDate('');
                        setDischargeCriteria('');
                        setTypeValue("HealthCheck");
                        changeVisibility();
                        break;
                    }
                }
            default:
                setError('Something went wrong. Entry type not found');
                setTimeout(() => {
                    changeVisibility();
                    setError('');
                }, 4000);
            break;
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue: string = (event.target as HTMLInputElement).value;
        if (selectedValue === "Hospital" || selectedValue === "OccupationalHealthcare" || selectedValue === "HealthCheck"){
            setTypeValue(selectedValue);
        }
        else{
            setError("Something wrong. Selected value not in entry types.");
        }
    };

    const typeSelected = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setType(typeValue);
    };

    const handleCancel = () => {
        setDescription('');
        setDate('');
        setSpecialist('');
        setHealthCheckRating(0);
        setDiagnosisCodes([]);
        setType(undefined);
        setEmployerName('');
        setSickLeaveStartDate('');
        setSickLeaveEndDate('');
        setDischargeDate('');
        setDischargeCriteria('');
        setTypeValue("HealthCheck");
        changeVisibility();
    };

    const handleDiagnosisCodesChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const { target: { value } } = event;
        setDiagnosisCodes(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleHealthRatingChange = (event:
        React.ChangeEvent<HTMLSelectElement>) => {
        const { target: { value } } = event;
        if (Number(value) === 0 || Number(value) === 1 || Number(value) === 2 || Number(value) === 3){
            setHealthCheckRating(Number(value));
        }
        else {
            setError('Something wrong. Health check rating is not of correct type.');
            setTimeout(() => setError(''), 4000);
        }
    };

    if (!visible){
        return null;
    }

    if (!type){
        return (
            <form onSubmit={typeSelected}>
                <FormControl>
                    <FormLabel id="entry-type">
                        Select entry type
                    </FormLabel>
                    <RadioGroup
                        name="entry-type-selection"
                        row
                        value={typeValue}
                        onChange={handleChange}
                    >
                        <FormControlLabel 
                            value = "HealthCheck"
                            control={<Radio />}
                            label="Health check"
                        />
                        <FormControlLabel 
                            value="OccupationalHealthcare"
                            control={<Radio />}
                            label="Occupational healthcare"
                        />
                        <FormControlLabel 
                            value="Hospital"
                            control={<Radio />}
                            label="Hospital"
                        />
                    </RadioGroup>
                    <Box
                        component="span"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCancel}
                            size="medium"
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            size="medium"
                        >
                            Select
                        </Button>
                    </Box>
                </FormControl>
            </form>
        );
    }

    switch (type) {
        case "Hospital":
            return (
                <form onSubmit={addEntry}>
                    <h3>New Hospital Entry</h3>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1, borderTop: 1 }}
                    >
                        <b>Mandatory fields for hospital entry</b>
                        <TextField 
                            type="text"
                            label="Description"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={description}
                            onChange={({ target }) => setDescription(target.value)}
                        />
                        <TextField 
                            type="date"
                            label="Date"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={date}
                            onChange={({ target }) => setDate(target.value)}
                        />
                        <TextField 
                            type="text"
                            label="Specialist"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={specialist}
                            onChange={({ target }) => setSpecialist(target.value)}
                        />
                        <b>Discharge</b>
                        <TextField 
                            type="date"
                            label="Discharge date"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={dischargeDate}
                            onChange={({ target }) => setDischargeDate(target.value)}
                        />
                        <TextField 
                            type="text"
                            label="Discharge criteria"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={dischargeCriteria}
                            onChange={({ target }) => setDischargeCriteria(target.value)}
                        />
                    </Box>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1 }}
                        component="span"
                        display="flex"
                        justifyContent="center"
                    >
                        <b>Optional fields below</b>
                    </Box>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1 }}
                    >
                        <InputLabel 
                            variant="standard"
                            htmlFor="uncontrolled-native"
                        >
                            <b>Diagnosiscodes (If any)</b>
                        </InputLabel>
                        <Select
                            id="diagnosis-codes-select"
                            multiple
                            fullWidth
                            value={diagnosisCodes}
                            onChange={handleDiagnosisCodesChange}
                            MenuProps={{
                                PaperProps: { 
                                    style: {
                                        maxHeight: 220
                                    }
                                }                        
                              }}
                        >
                            {diagnoses.map(d => (
                                <MenuItem
                                    key={d.code}
                                    value={d.code}
                                >
                                    {d.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box
                        component="span"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCancel}
                            size="large"
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            size="large"
                        >
                            ADD
                        </Button>
                    </Box>
                </form>
            );
        case "HealthCheck":
            return (
                <form onSubmit={addEntry}>
                    <h3>New Health Check entry</h3>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1, borderTop: 1 }}
                    >
                        <b>Mandatory fields for health check entry</b>
                        <TextField 
                            type="text"
                            label="Description"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={description}
                            onChange={({ target }) => setDescription(target.value)}
                        />
                        <TextField 
                            type="date"
                            label="Date"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={date}
                            onChange={({ target }) => setDate(target.value)}
                        />
                        <TextField 
                            type="text"
                            label="Specialist"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={specialist}
                            onChange={({ target }) => setSpecialist(target.value)}
                        />
                        <InputLabel 
                            variant="standard"
                            htmlFor="uncontrolled-native"
                        >
                            <b>Health check rating</b>
                        </InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'selected-health-rating',
                                id: 'uncontrolled-native'
                            }}
                            value={healthCheckRating}
                            onChange={handleHealthRatingChange}
                        >
                            <option value={0}>Healthy</option>
                            <option value={1}>Low risk</option>
                            <option value={2}>High risk</option>
                            <option value={3}>Critical risk</option>
                        </NativeSelect>
                    </Box>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1 }}
                        component="span"
                        display="flex"
                        justifyContent="center"
                    >
                        <b>Optional fields below</b>
                    </Box>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1 }}
                    >
                        <InputLabel 
                            variant="standard"
                            htmlFor="uncontrolled-native"
                        >
                            <b>Diagnosiscodes (If any)</b>
                        </InputLabel>
                        <Select
                            id="diagnosis-codes-select"
                            multiple
                            fullWidth
                            value={diagnosisCodes}
                            onChange={handleDiagnosisCodesChange}
                            MenuProps={{
                                PaperProps: { 
                                    style: {
                                        maxHeight: 220
                                    }
                                }                        
                              }}
                        >
                            {diagnoses.map(d => (
                                <MenuItem
                                    key={d.code}
                                    value={d.code}
                                >
                                    {d.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box
                        component="span"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCancel}
                            size="large"
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            size="large"
                        >
                            ADD
                        </Button>
                    </Box>
                </form>
            );
        case "OccupationalHealthcare":
            return (
                <form onSubmit={addEntry}>
                    <h3>New Occupational Healthcare entry</h3>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1, borderTop: 1 }}
                    >
                        <b>Mandatory fields for occupational healthcare entry</b>
                        <TextField 
                            type="text"
                            label="Description"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={description}
                            onChange={({ target }) => setDescription(target.value)}
                        />
                        <TextField 
                            type="date"
                            label="Date"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={date}
                            onChange={({ target }) => setDate(target.value)}
                        />
                        <TextField 
                            type="text"
                            label="Specialist"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={specialist}
                            onChange={({ target }) => setSpecialist(target.value)}
                        />
                        <TextField 
                            type="text"
                            label="Employer name"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={employerName}
                            onChange={({ target }) => setEmployerName(target.value)}
                        />
                    </Box>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1 }}
                        component="span"
                        display="flex"
                        justifyContent="center"
                    >
                        <b>Optional fields below</b>
                    </Box>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1 }}
                    >
                        <InputLabel 
                            variant="standard"
                            htmlFor="uncontrolled-native"
                        >
                            <b>Diagnosiscodes (If any)</b>
                        </InputLabel>
                        <Select
                            id="diagnosis-codes-select"
                            multiple
                            fullWidth
                            value={diagnosisCodes}
                            onChange={handleDiagnosisCodesChange}
                            MenuProps={{
                                PaperProps: { 
                                    style: {
                                        maxHeight: 220
                                    }
                                }                        
                              }}
                        >
                            {diagnoses.map(d => (
                                <MenuItem
                                    key={d.code}
                                    value={d.code}
                                >
                                    {d.code}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box
                        sx={{ padding: 1, marginBottom: 1, borderBottom: 1 }}
                    >
                        <b>Sickleave (If needed)</b>
                        <TextField 
                            type="date"
                            label="Sick leave starting date"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={sickLeaveStartDate}
                            onChange={({ target }) => setSickLeaveStartDate(target.value)}
                        />
                        <TextField 
                            type="date"
                            label="Sick leave ending date"
                            variant="filled"
                            size="medium"
                            fullWidth
                            focused
                            value={sickLeaveEndDate}
                            onChange={({ target }) => setSickLeaveEndDate(target.value)}
                        />
                    </Box>
                    <Box
                        component="span"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleCancel}
                            size="large"
                        >
                            CANCEL
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            type="submit"
                            size="large"
                        >
                            ADD
                        </Button>
                    </Box>
                </form>
            );
        default:
            setError('Something went wrong. Entry type not found');
            setTimeout(() => {
                changeVisibility();
                setError('');
            }, 4000);
            break;            
    }
};

export default EntryForm;