import { Alert } from '@mui/material';

const Notification = ({ notification }: { notification: string | undefined }) => {
    if (notification){
        return <Alert severity='error'>{notification}</Alert>;
    }
    return null;
};

export default Notification;