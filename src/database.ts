import mongoose from 'mongoose';
import {mongodb} from './keys';
mongoose.connect(mongodb.URI, {
    useUnifiedTopology: true,
    useNewUrlParser:true
    
})

.then (db => console.log('DB is Conected'))
.catch(err => console.log(err));
/*
export const url = mongoose.connect(mongodb.url, {
    useUnifiedTopology: true,
    useNewUrlParser:true
    
})
.then (db => console.log('DB is Conected'))
.catch(err => console.log(err));*/