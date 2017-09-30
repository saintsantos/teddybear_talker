import eventStore from '../stores/eventStore';
import axios from 'axios';

function fetchEvents() {
    axios.get('http://localhost:5000/events/monday').then(res => {
            console.log(res.data.events);
        }).catch(error => {
            console.log(error);
        })

}