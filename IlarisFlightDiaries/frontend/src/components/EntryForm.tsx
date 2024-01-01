import { useState } from "react";
import { NewEntry, Visibility, Weather } from "../types";

const EntryForm = ({ createEntry }: { createEntry: (n: NewEntry) => void }) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
    const [weather, setWeather] = useState<Weather>(Weather.Sunny);
    const [comment, setComment] = useState('');

    const addEntry = (event: React.SyntheticEvent) => {
        event.preventDefault();
        createEntry({
            date,
            visibility,
            weather,
            comment
        });
        setDate('');
        setVisibility(Visibility.Great);
        setWeather(Weather.Sunny);
        setComment('');
    };

    return (
        <form onSubmit={addEntry}>
            <div>            
            date
            <input 
                value = { date }
                onChange = { event => setDate(event.target.value) }
                id = "date-input"
                type="date"
            />
            </div>
            <div>
            visibility 
            great
            <input 
                type="radio"
                value="great"
                onChange={ () => setVisibility(Visibility.Great) }
                checked={ visibility === 'great' }
            />
            good 
            <input 
                type="radio"
                onChange={ () => setVisibility(Visibility.Good) }
                name = "visibility"
                checked={ visibility === 'good' }
            />
            ok
            <input 
                type="radio"
                onChange={ () => setVisibility(Visibility.Ok) }
                name = "visibility"
                checked={ visibility === 'ok' }
            />
            poor
            <input 
                type="radio"
                onChange={ () => setVisibility(Visibility.Poor) }
                name = 'visibility'
                checked={ visibility === 'poor' }
            />
            </div>
            <div>
            weather
            sunny
            <input 
                type="radio"
                onChange={ () => setWeather(Weather.Sunny) }
                name = 'weather'
                checked={ weather === 'sunny' }
            />
            rainy
            <input 
                type="radio"
                onChange={ () => setWeather(Weather.Rainy) }
                name = 'weather'
                checked={ weather === 'rainy' }
            />
            cloudy
            <input 
                type="radio"
                onChange={ () => setWeather(Weather.Cloudy) }
                name = 'weather'
                checked={ weather === 'cloudy' }
            />
            stormy
            <input 
                type="radio"
                onChange={ () => setWeather(Weather.Stormy) }
                name = 'weather'
                checked={ weather === 'stormy' }
            />
            windy
            <input 
                type="radio"
                onChange={ () => setWeather(Weather.Windy) }
                name = 'weather'
                checked={ weather === 'windy' }
            />
            </div>
            <div>
            comment
            <input 
                value = { comment }
                onChange = { event => setComment(event.target.value) }
                id = 'comment-input'
            />
            </div>
            <button type="submit">add</button>
        </form>
    );
};

export default EntryForm;