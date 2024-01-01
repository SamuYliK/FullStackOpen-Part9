import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from "../../types";
import SickLeave from "./SickLeave";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <>
            {entry.date}
            <LocalHospitalIcon />
            <br></br>
            <em>{entry.description}</em>
            <br></br>
            Diagnose by: {entry.specialist}
            <br></br>
            Discharge on {entry.discharge.date}.
            Criteria: <em>{entry.discharge.criteria}</em>
        </>
    );
};

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <>
            {entry.date}
            <WorkIcon />
            <em><b>{entry.employerName}</b></em>
            <br></br>
            <em>{entry.description}</em>
            <br></br>
            Diagnose by: {entry.specialist}
            <br></br>
            <SickLeave sickLeave={entry.sickLeave}/>
        </>
    );
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    const color = Object.keys(HealthCheckRating).find( key => HealthCheckRating[key as keyof typeof HealthCheckRating] === entry.healthCheckRating);
    return (
        <>
            {entry.date}
            <MedicalServicesIcon />
            <br></br>
            <em>{entry.description}</em>
            <br></br>
            <FavoriteIcon sx={{ color:`secondary.${color}` }} />
            <br></br>
            Diagnose by: {entry.specialist}
        </>
    );
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated entry type: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;