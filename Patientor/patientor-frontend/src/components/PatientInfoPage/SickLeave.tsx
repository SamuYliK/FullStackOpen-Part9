const sickLeave = ({ sickLeave }: { sickLeave: { startDate: string, endDate: string } | undefined }) => {
    if (!sickLeave){
        return null;
    }
    return (
        <p>
            Sick leave starts on: {sickLeave.startDate}.
            <br></br>
            Sick leave ends on: {sickLeave.endDate}.
        </p>
    );
};

export default sickLeave;