const Notification = ({ message }: { message: string }) => {
    if (message === ''){
        return null;
    } else {
        return <p style={ { color: "red" } }>{message}</p>;
    }
    
};

export default Notification;