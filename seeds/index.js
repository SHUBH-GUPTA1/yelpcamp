const mongoose=require('mongoose');
const cities=require('./cities');
const{places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');
const axios=require('axios');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
 //,{
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true
// });

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});
const sample=array=>array[Math.floor(Math.random()*array.length)];


// async function seedImg() {
//     try {
//       const resp = await axios.get('https://api.unsplash.com/photos/random', {
//         params: {
//           client_id: '288dPA7EujVatTswQX1YW6_tAmW3gT7T5GA2w7kHwEQ',
//           collections: 1114848,
//         },
//       })
//       return resp.data.urls.small
//     } catch (err) {
//       console.error(err)
//     }
//   }


const seedDB =async()=>{
    await Campground.deleteMany({});
for(let i=0;i<300;i++){
    const random1000=Math.floor(Math.random()*1000);
    const price=Math.floor(Math.random()*20)+10;
    const camp = new Campground({
      //YOUR USER ID
      author:'6469eba19774ceef9c03ed08',
        location:`${cities[random1000].city},${cities[random1000].state}`,
        title:`${sample(descriptors)} ${sample(places)}`,
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!',
        price,  
        geometry:{
          type:"Point",
          coordinates:[
            cities[random1000].longitude,
            cities[random1000].latitude,
        ]
        },
        images:[
          {
            url:'https://res.cloudinary.com/dusyku43v/image/upload/v1684766539/YelpCamp/akpn1dzvzs83phglxb3t.jpg',
            filename:'YelpCamp/akpn1dzvzs83phglxb3t'
          },
          {
            url:'https://res.cloudinary.com/dusyku43v/image/upload/v1684766540/YelpCamp/jsxjaikvyi3tdep36ywk.jpg',
            filename:'YelpCamp/jsxjaikvyi3tdep36ywk'

          }
        ]  
      });
await camp.save();
}
}
seedDB().then(() => {
  mongoose.connection.close();
})