const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//load env vars 
dotenv.config({ path: './config/config.env' });

//load models
const Bootcamp = require('./models/Bootcamp');

// connect from db 
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  //read json 
  const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
  );

  //import data in db 
  const importData = async () => {
      try{
        await Bootcamp.create(bootcamps);
        process.exit();
        console.log('data imported...'.green.inverse);
      }catch(err){
          console.error(err);

      }
  }
//delete data
  const deleteData = async () => {
    try{
      await Bootcamp.deleteMany();
      console.log('data destroyed...'.red.inverse);
      process.exit();
    }catch(err){
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
  } else if (process.argv[2] === '-d') {
    deleteData();
  }