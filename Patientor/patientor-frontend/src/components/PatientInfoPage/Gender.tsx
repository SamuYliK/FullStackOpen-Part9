import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

const Gender = ({ gender }: { gender: string }) => {
    if (gender === 'female'){
        return <FemaleIcon />;
    } else if (gender === 'male'){
        return <MaleIcon />;
    } else {
        return 'other';
    }
};

export default Gender;