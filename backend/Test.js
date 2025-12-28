const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


//MAHIMA

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/test', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB is connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

// Schema and Model
const Schema = mongoose.Schema;

const dataschema = new Schema({
  username: String,
  email: String,
  password: String,
  otp: String, // Add OTP field
}, { collection: 'signupdata' });

const Data = mongoose.model('Data', dataschema);



//define the schema

const transactionSchema = new mongoose.Schema({
  amount: String,
  cardNumber: String,
  name: String,
  date1: String, // Expiry Month
  date2: String, // Expiry Year
  security: String,
  currenttime: String
}, { collection: 'transactiondatabase' });

const Transaction = mongoose.model('Transaction', transactionSchema);

//CODE FOR POSTING INTO DATABASE (TRANSACTION)
app.post('/transactiondata', (req, res) => {
  const { amount, cardNumber, name, date1, date2, security, currenttime} = req.body;

  const newTransaction = new Transaction({
    amount, 
    cardNumber, 
    name, 
    date1, 
    date2, 
    security,
    currenttime
  });
  
  newTransaction.save()
    .then(() => res.status(201).send('Transaction added successfully'))
    .catch(err => {
      console.error("Error saving transaction data:", err);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/transactiondata', async (req, res) => {
  try {
    const items = await Transaction.find({});
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching transaction data:', error);
    res.status(500).send('Internal Server Error');
  }
});





//HARSH




// Route to handle OTP generation and sending
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP

  try {
    const user = await Data.findOneAndUpdate({ email }, { otp });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "unknownplayer1004@gmail.com",
        pass: "xnhl bzue zyhg xjjt",
      },
    });

    const mailOptions = {
      from: {
        name: "Manish Ghanshani",
        address: "unknownplayer1004@gmail.com",
      },
      to: email,
      subject: "OTP Verification Code for Your MERN Project Login",
      text: `Your one-time password (OTP) for logging into our 
      MERN project is: ${otp}. Please enter this code to complete
       your login process. If you did not request this OTP, 
       please disregard this message.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('OTP sent');
  } catch (error) {
    console.error('Error during OTP sending:', error);
    res.status(500).send('Internal Server Error');
  }
});



//MANISH


app.post('/appointment-first', async (req, res) => {
  const { firstnamefirst, surnamefirst, phonenumfirst, emailfirst, appointmentdatefirst, appointmenttimefirst } = req.body;

  try {
    
    res.status(200).json({ message: "Appointment received, SMS is being sent." });

    
    
    const AccountSID = "ACxxxxxxxxxxxxxxxxxxxx"; 	
    const AuthToken = "xxxxxxxxxxxxxxxxxxxx"; 
    const twilionum = "+xxxxxxxxxxx"; 
    const phonenum = "+91xxxxxxxxxx"; 
    const client = require('twilio')(AccountSID, AuthToken);

    const sendSMS = async () => {
      let msgOptions = {
        from: twilionum,
        to: phonenum,
        body: `Dear Mr. Ghanshani,
        I hope this message finds you well. I would like to schedule an appointment with you to discuss my investment options.
        Please find the details of my request below:-
        Name: ${firstnamefirst}
        Phone number: ${phonenumfirst}
        Email: ${emailfirst}
        Preferred Appointment Date: ${appointmentdatefirst}
        Preferred Appointment Time: ${appointmenttimefirst}
        Please let me know if this time is convenient for you or if there are any adjustments needed. I look forward to your confirmation.

        Best regards,
        ${firstnamefirst} ${surnamefirst}`,
      };

      try {
        const message = await client.messages.create(msgOptions);
        console.log("Message sent successfully:", message.sid);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };

    sendSMS(); 

  } catch (error) {
    console.error(error);
  }
});



//MANISH


app.post('/appointment-second', async (req, res) => {
  const { firstnamesecond, surnamesecond, phonenumsecond, emailsecond, appointmentdatesecond, appointmenttimesecond } = req.body;

  try {
    
    res.status(200).json({ message: "Appointment received, SMS is being sent." });

    
    
    const AccountSID = "xxxxxxxxxxxxxxxxxxxxx"; // Your Account SID from Twilio xxxxxxxxxxxxxxxxxxxxx
const AuthToken = "xxxxxxxxxxxxxxxxxxxxx"; // Your Auth Token from Twilio xxxxxxxxxxxxxxxxxxxxx
const twilionum = "+xxxxxxxxxxxxxxxxxxxxx"; // Your Twilio phone number +12174876175
const phonenum = "+xxxxxxxxxxxxxxxxxxxxx";
    const client = require('twilio')(AccountSID, AuthToken);

    const sendSMS = async () => {
      let msgOptions = {
        from: twilionum,
        to: phonenum,
        body: `Dear Mr. Kesarwani,
        I hope this message finds you well. I would like to schedule an appointment with you to discuss my investment options.
        Please find the details of my request below:-
        Name: ${firstnamesecond}
        Phone number: ${phonenumsecond}
        Email: ${emailsecond}
        Preferred Appointment Date: ${appointmentdatesecond}
        Preferred Appointment Time: ${appointmenttimesecond}
        Please let me know if this time is convenient for you or if there are any adjustments needed. I look forward to your confirmation.

        Best regards,
        ${firstnamesecond} ${surnamesecond}`,
      };

      try {
        const message = await client.messages.create(msgOptions);
        console.log("Message sent successfully:", message.sid);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };

    sendSMS(); 

  } catch (error) {
    console.error(error);
  }
});



//MANISH


app.post('/appointment-third', async (req, res) => {
  const { firstnamethird, surnamethird, phonenumthird, emailthird, appointmentdatethird, appointmenttimethird } = req.body;

  try {
    
    res.status(200).json({ message: "Appointment received, SMS is being sent." });

    
    
    const AccountSID = "xxxxxxxxxxxxxxxxxxxxx";
    const AuthToken = "xxxxxxxxxxxxxxxxxxxxx";
    const twilionum = "+xxxxxxxxxxxxxxxxxxxxx";
    const phonenum = "+xxxxxxxxxxxxxxxxxxxxx"
    const client = require('twilio')(AccountSID, AuthToken);

    const sendSMS = async () => {
      let msgOptions = {
        from: twilionum,
        to: phonenum,
        body: `Dear Mr. Jadhav,
        I hope this message finds you well. I would like to schedule an appointment with you to discuss my investment options.
        Please find the details of my request below:-
        Name: ${firstnamethird}
        Phone number: ${phonenumthird}
        Email: ${emailthird}
        Preferred Appointment Date: ${appointmentdatethird}
        Preferred Appointment Time: ${appointmenttimethird}
        Please let me know if this time is convenient for you or if there are any adjustments needed. I look forward to your confirmation.

        Best regards,
        ${firstnamethird} ${surnamethird}`,
      };

      try {
        const message = await client.messages.create(msgOptions);
        console.log("Message sent successfully:", message.sid);
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };

    sendSMS(); 

  } catch (error) {
    console.error(error);
  }
});





//HARSH



// Route for Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Data.findOne({ email, password });

    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Internal Server Error');
  }
});


//MAHIMA (SIGNUP MONGO DATA SENDING)

app.post('/submit', (req, res) => {
  const { username, email, password } = req.body;
  const newData = new Data({
    username,
    email,
    password,
  });

  newData.save()
    .then(() => res.status(201).send('User added successfully'))
    .catch(err => {
      console.error("Error saving data:", err);
      res.status(500).send('Internal Server Error');
    });
});


//HARSH

app.post('/validate-otp', async (req, res) => {
  const { otp } = req.body;

  try {
    // Find the user by OTP
    const user = await Data.findOne({ otp });

    if (user) {
      res.json({ success: true, message: 'OTP is correct' });
      
    } else {
      res.status(401).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error during OTP validation:', error);
    res.status(500).send('Internal Server Error');
  }
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
