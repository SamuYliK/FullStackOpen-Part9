import axios from 'axios';
import { Entry, NewEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAllEntries = () => {
    return axios
        .get<Entry[]>(baseUrl)
        .then(response => response.data);
};

export const addNewDiary = async (object: NewEntry) => {
    try{
        const addedDiary = await axios
        .post<Entry>(baseUrl, object)
        .then(response => response.data);
        return addedDiary;
    } catch (error) {
        if (axios.isAxiosError(error)){
            if(error.response){
                return error.response.data;
            }  
        }
        return 'Something went wrong, unknown Error.';
    }
};