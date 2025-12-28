import React, {useRef} from 'react'
import { useState } from 'react'

import './Appointment.css'

const Appointment = () => {
    const formRef = useRef(null)
    const [firsttoggle, setfirsttoggle] = useState(true)
    const [secondtoggle, setsecondtoggle] = useState(false)
    const [thirdtoggle, setthirdtoggle] = useState(false)
    const [fourthtoggle, setfourthtoggle] = useState(false)
    const [scrollfirstform, setsrollfirstform] = useState(false)
    const [scrollsecondform, setsrollsecondform] = useState(false)
    const [scrollthirdform, setsrollthirdform] = useState(false)


    const [firstnamefirst, setfirstnamefirst] = useState('')
    const [surnamefirst, setsurnamefirst] = useState('')
    const [phonenumfirst, setphonenumfirst] = useState('')
    const [emailfirst, setemailfirst] = useState('')
    const [appointmentdatefirst, setappointmentdatefirst] = useState('')
    const [appointmenttimefirst, setappointmenttimefirst] = useState('')
    const [errmessagefirst, seterrmessagefirst] = useState('')

    const [firstnamesecond, setfirstnamesecond] = useState('')
    const [surnamesecond, setsurnamesecond] = useState('')
    const [phonenumsecond, setphonenumsecond] = useState('')
    const [emailsecond, setemailsecond] = useState('')
    const [appointmentdatesecond, setappointmentdatesecond] = useState('')
    const [appointmenttimesecond, setappointmenttimesecond] = useState('')
    const [errmessagesecond, seterrmessagesecond] = useState('')

    const [firstnamethird, setfirstnamethird] = useState('')
    const [surnamethird, setsurnamethird] = useState('')
    const [phonenumthird, setphonenumthird] = useState('')
    const [emailthird, setemailthird] = useState('')
    const [appointmentdatethird, setappointmentdatethird] = useState('')
    const [appointmenttimethird, setappointmenttimethird] = useState('')
    const [errmessagethird, seterrmessagethird] = useState('')
    

    const handlefirsttoggle = ()=>{
        setfirsttoggle(true)
        setsecondtoggle(false)
        setthirdtoggle(false)
    }

    const handlesecondtoggle = ()=>{
        setsecondtoggle(true)
        setfirsttoggle(false)
        setthirdtoggle(false)
    }

    const handlethirdtoggle = ()=>{
        setthirdtoggle(true)
        setfirsttoggle(false)
        setsecondtoggle(false)
    }

    



    const handleforwardslides = () => {
        if(firsttoggle)
        {
            setfirsttoggle(false)
            setsecondtoggle(true)
        }
        else if(secondtoggle)
        {
            setsecondtoggle(false)
            setthirdtoggle(true)
        }
         else if(thirdtoggle)
        {
            setthirdtoggle(false)
            setfirsttoggle(true) 
        }
        /*else if(fourthtoggle)
        {
            setfourthtoggle(false)
            setfirsttoggle(true)
        }*/
    }

    const handlebackwardslides = () => {
        if(firsttoggle)
        {
            setfirsttoggle(false)
            setthirdtoggle(true)
        }
        else if(secondtoggle)
        {
            setsecondtoggle(false)
            setfirsttoggle(true)
        }
         else if(thirdtoggle)
        {
            setthirdtoggle(false)
            setsecondtoggle(true)
        }

        
        /*else if(fourthtoggle)
        {
            setfourthtoggle(false)
            setthirdtoggle(true)
        }*/
    }

    const handlescrollfirst =() => {
        setsrollfirstform(true)
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
      };

      const handlescrollsecond =() => {
        setsrollsecondform(true)
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
      };
      
      const handlescrollthird =() => {
        setsrollthirdform(true)
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 0);
      };

      const handlesubmitfirst = async (e) => {
        e.preventDefault(); 
        const selecteddatefirst = new Date(appointmentdatefirst);
        const currenttime = new Date();
        currenttime.setHours(0, 0, 0, 0);

        const [hours, minutes] = appointmenttimefirst.split(':').map(Number);
        const selectedTime = new Date();
        selectedTime.setHours(hours, minutes, 0);
        
        const startTime = new Date();
        startTime.setHours(9, 0, 0); // 9:00 AM

        const endTime = new Date();
        endTime.setHours(21, 0, 0);

        /*console.log(firstnamefirst)
        console.log(surnamefirst)
        console.log(phonenumfirst)
        console.log(emailfirst)
        console.log(selecteddatefirst)
        console.log(appointmenttimefirst)*/

        if(firstnamefirst.length == 0)
        {
            seterrmessagefirst('*Name is mandatory!')
        }
        else if(surnamefirst.length == 0)
        {
            seterrmessagefirst('*Surname is mandatory!')
        }
        else if( phonenumfirst.length != 10)
        {
            seterrmessagefirst('*Phone number is invalid!')
        }
        else if(emailfirst.length ==0)
        {
            seterrmessagefirst('*Email is mandatory!')
        }
        else if(selecteddatefirst <= currenttime)
        {
            seterrmessagefirst('*The appointment date must be later than today!!')
        }
        else if(selectedTime < startTime || selectedTime > endTime)
        {
            seterrmessagefirst('*The time must be between 09:00 AM and 09:00 PM.');
        }
        else
        {
            seterrmessagefirst('')
            

            const item = {firstnamefirst, surnamefirst, phonenumfirst, emailfirst, appointmentdatefirst, appointmenttimefirst}

            try{
                const response = await fetch('http://localhost:5000/appointment-first',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(item), 
                })

                if(response.ok)
                {
                    alert("data sent successfull")
                }
                else{
                    alert('ERROR ADDING USER')
                }


            }
            catch(error)
            {
                console.error(error)
            }

        }
        
        

      }

      const handlesubmitsecond = async (e) => {
        e.preventDefault(); 
        const selecteddatesecond = new Date(appointmentdatesecond);
        const currenttime = new Date();
        currenttime.setHours(0, 0, 0, 0);

        const [hours, minutes] = appointmenttimesecond.split(':').map(Number);
        const selectedTime = new Date();
        selectedTime.setHours(hours, minutes, 0);
        
        const startTime = new Date();
        startTime.setHours(9, 0, 0); // 9:00 AM

        const endTime = new Date();
        endTime.setHours(21, 0, 0);

        /*console.log(firstnamefirst)
        console.log(surnamefirst)
        console.log(phonenumfirst)
        console.log(emailfirst)
        console.log(selecteddatefirst)
        console.log(appointmenttimefirst)*/

        if(firstnamesecond.length == 0)
        {
            seterrmessagesecond('*Name is mandatory!')
        }
        else if(surnamesecond.length == 0)
        {
            seterrmessagesecond('*Surname is mandatory!')
        }
        else if( phonenumsecond.length != 10)
        {
            seterrmessagesecond('*Phone number is invalid!')
        }
        else if(emailsecond.length ==0)
        {
            seterrmessagesecond('*Email is mandatory!')
        }
        else if(selecteddatesecond <= currenttime)
        {
            seterrmessagesecond('*The appointment date must be later than today!!')
        }
        else if(selectedTime < startTime || selectedTime > endTime)
        {
            seterrmessagesecond('*The time must be between 09:00 AM and 09:00 PM.');
        }
        else
        {
            seterrmessagesecond('')
            

            const item = {firstnamesecond, surnamesecond, phonenumsecond, emailsecond, appointmentdatesecond, appointmenttimesecond}

            try{
                const response = await fetch('http://localhost:5000/appointment-second',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(item), 
                })

                if(response.ok)
                {
                    alert("data sent successfull")
                }
                else{
                    alert('ERROR ADDING USER')
                }


            }
            catch(error)
            {
                console.error(error)
            }

        }
        
        

      }


      const handlesubmitthird = async (e) => {
        e.preventDefault(); 
        const selecteddatethird = new Date(appointmentdatethird);
        const currenttime = new Date();
        currenttime.setHours(0, 0, 0, 0);

        const [hours, minutes] = appointmenttimethird.split(':').map(Number);
        const selectedTime = new Date();
        selectedTime.setHours(hours, minutes, 0);
        
        const startTime = new Date();
        startTime.setHours(9, 0, 0); // 9:00 AM

        const endTime = new Date();
        endTime.setHours(21, 0, 0);

        /*console.log(firstnamefirst)
        console.log(surnamefirst)
        console.log(phonenumfirst)
        console.log(emailfirst)
        console.log(selecteddatefirst)
        console.log(appointmenttimefirst)*/

        if(firstnamethird.length == 0)
        {
            seterrmessagethird('*Name is mandatory!')
        }
        else if(surnamethird.length == 0)
        {
            seterrmessagethird('*Surname is mandatory!')
        }
        else if( phonenumthird.length != 10)
        {
            seterrmessagethird('*Phone number is invalid!')
        }
        else if(emailthird.length ==0)
        {
            seterrmessagethird('*Email is mandatory!')
        }
        else if(selecteddatethird <= currenttime)
        {
            seterrmessagethird('*The appointment date must be later than today!!')
        }
        else if(selectedTime < startTime || selectedTime > endTime)
        {
            seterrmessagethird('*The time must be between 09:00 AM and 09:00 PM.');
        }
        else
        {
            seterrmessagethird('')
            

            const item = {firstnamethird, surnamethird, phonenumthird, emailthird, appointmentdatethird, appointmenttimethird}

            try{
                const response = await fetch('http://localhost:5000/appointment-third',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify(item), 
                })

                if(response.ok)
                {
                    alert("data sent successfull")
                }
                else{
                    alert('ERROR ADDING USER')
                }


            }
            catch(error)
            {
                console.error(error)
            }

        }
        
        

      }

  return (
    <div>
        <div  >
            



            <div className='forwardbutton' onClick={handleforwardslides}>
                <img src={require('./chevron-png.png')} alt='forwardbutton' className='forwardicon'></img>
            </div>
            <div className='backwardbutton' onClick={handlebackwardslides}>
                <img src={require('./chevron-png.png')} alt='forwardbutton' className='backwardicon'></img>
            </div>


    {firsttoggle && (
        <div>
            
          <div className='mainboxfirst' >
          
            <img src={require('./stocks_media/manish_png.png')} className='sumitphoto'></img>
            <img src={require('./stocks_media/spashnew.png')} className='spashnew'></img>

            <div className='underlinegreen' ></div>
            <p className='bookappointmenttext' >BOOK AN APPOINTMENT</p>
            <p className='sumitkesarwanitext' >MANISH GHANSHANI</p>
            <p className='professiontext' > Profession : Stock Market Advisor</p>
            <p className='agetext' > Age : 18 years</p>
            <p className='descriptiontext' > Manish Ghanshani is a skilled investment advisor 
                with 4 years of<br></br> experience. He specializes in crafting personalized investment 
                strategies,<br></br> focusing on equities, bonds, and mutual funds. Manish’s client-focused <br></br>
                approach and deep market insights help clients achieve <br></br>their financial goals effectively.
</p>
            
            <button className='bookbuttonsumit' onClick={handlescrollfirst} >BOOK AN APPOINTMENT</button>
            <img src={require('./stocks_media/cloud_down.png')} className='cloud1_1'></img>
            <img src={require('./stocks_media/cloud_down.png')} className='cloud1_2'></img>
            <button className='button1firstex' onClick={handlefirsttoggle} >1</button>
            <button className='button2first' onClick={handlesecondtoggle} >2</button>
            <button className='button3first' onClick={handlethirdtoggle} >3</button>
          </div>

          {scrollfirstform && (
        <div>
          <div className='firstformmain' >
                <div className='firstform' ref={formRef}  >
                    <form>
                        <p className='requestappoitmenttext'  >REQUEST AN APPOINTMENT</p>
                        <p className='namefirst' >First name</p>

                        <input type='text' 
                        className='firstnameinputfirst' 
                        placeholder='Enter first name' 
                        value={firstnamefirst} 
                        onChange={(e)=>setfirstnamefirst(e.target.value)}
                        ></input>

                        <p className='surnamefirst' >Surname</p>

                        <input type='text' 
                        className='surnamenameinputfirst' 
                        placeholder='Enter surname' 
                        value={surnamefirst}
                        onChange={(e) => setsurnamefirst(e.target.value)}
                        ></input>

                        <p className='phonenumfirst' >Name</p>

                        <input type='text' 
                        className='phonenumberinputfirst' 
                        placeholder='Enter phone number' 
                        value={phonenumfirst}
                        onChange={(e) => setphonenumfirst(e.target.value)}
                        ></input>

                        <p className='emailtextfirst' >Email</p>

                        <input type='text' 
                        className='emailinputfirst' 
                        placeholder='Enter email' 
                        value={emailfirst}
                        onChange={(e) => setemailfirst(e.target.value)}
                        ></input>

                        <p className='appointmentdatefirst' >Appointment date</p>

                        <input type='date' 
                        className='appointmentinputfirst'
                        value={appointmentdatefirst}
                        onChange={(e) => setappointmentdatefirst(e.target.value)}
                        ></input>

                        <p className='appointmentdatetextfirst' >Appointment time </p>

                        <input type='time' 
                        className='appointmenttimeinputfirst' 
                        value={appointmenttimefirst}
                        onChange={(e) => setappointmenttimefirst(e.target.value)}
                        ></input>

                        <button className='confirmbuttonfirst' onClick={handlesubmitfirst} >CONFIRM APPOINTMENT</button>
                        <p className='errmessagefirst' >{errmessagefirst}</p>
                        
                    </form>


                </div>
        </div>
        </div>
        )}
          
        
        </div>
        )}

    {secondtoggle && (
        <div>
          <div className='mainboxsecond' >
            <img src={require('./stocks_media/sumit_png.png')} className='sumitphoto'></img>
            <img src={require('./stocks_media/spashnew.png')} className='spashnew'></img>

            <div className='underlinegreen' ></div>
            <p className='bookappointmenttext' >BOOK AN APPOINTMENT</p>
            <p className='sumitkesarwanitext' >SUMIT KESARWANI</p>
            <p className='professiontext' > Profession : Financial Advisor</p>
            <p className='agetext' > Age : 19 years</p>
            <p className='descriptiontext' > Sumit Kesarwani is an experienced financial advisor with
                over <br></br>2 years of experience in the field. He specializes in 
                investment <br></br>strategies, retirement planning, and wealth 
                management.<br></br> His personalized approach has helped 
                numerous clients <br></br>achieve their financial goals.</p>
            
            <button className='bookbuttonsumit' onClick={handlescrollsecond} >BOOK AN APPOINTMENT</button>
            <img src={require('./stocks_media/cloud_down.png')} className='cloud2_1'></img>
            <img src={require('./stocks_media/cloud_down.png')} className='cloud2_2'></img>
            <button className='button1first' onClick={handlefirsttoggle} >1</button>
            <button className='button2firstex' onClick={handlesecondtoggle} >2</button>
            <button className='button3first' onClick={handlethirdtoggle} >3</button>

          </div>
          {scrollsecondform && (
        <div>
          <div className='firstformmain' >
                <div className='firstform' ref={formRef}  >
                    <form>
                        <p className='requestappoitmenttext'  >REQUEST AN APPOINTMENT</p>
                        <p className='namefirst' >First name</p>

                        <input type='text' 
                        className='firstnameinputfirst' 
                        placeholder='Enter first name' 
                        value={firstnamesecond} 
                        onChange={(e)=>setfirstnamesecond(e.target.value)}
                        ></input>

                        <p className='surnamefirst' >Surname</p>

                        <input type='text' 
                        className='surnamenameinputfirst' 
                        placeholder='Enter surname' 
                        value={surnamesecond}
                        onChange={(e) => setsurnamesecond(e.target.value)}
                        ></input>

                        <p className='phonenumfirst' >Name</p>

                        <input type='text' 
                        className='phonenumberinputfirst' 
                        placeholder='Enter phone number' 
                        value={phonenumsecond}
                        onChange={(e) => setphonenumsecond(e.target.value)}
                        ></input>

                        <p className='emailtextfirst' >Email</p>

                        <input type='text' 
                        className='emailinputfirst' 
                        placeholder='Enter email' 
                        value={emailsecond}
                        onChange={(e) => setemailsecond(e.target.value)}
                        ></input>

                        <p className='appointmentdatefirst' >Appointment date</p>

                        <input type='date' 
                        className='appointmentinputfirst'
                        value={appointmentdatesecond}
                        onChange={(e) => setappointmentdatesecond(e.target.value)}
                        ></input>

                        <p className='appointmentdatetextfirst' >Appointment time </p>

                        <input type='time' 
                        className='appointmenttimeinputfirst' 
                        value={appointmenttimesecond}
                        onChange={(e) => setappointmenttimesecond(e.target.value)}
                        ></input>

                        <button className='confirmbuttonfirst' onClick={handlesubmitsecond} >CONFIRM APPOINTMENT</button>
                        <p className='errmessagefirst' >{errmessagesecond}</p>
                        
                    </form>


                </div>
        </div>
        </div>
        )}
        </div>
        )}
    {thirdtoggle && (
        <div>
          <div className='mainboxthird' >
          <img src={require('./stocks_media/Sankalp_png.png')} className='sumitphoto'></img>
            <img src={require('./stocks_media/spashnew.png')} className='spashnew'></img>

            <div className='underlinegreen' ></div>
            <p className='bookappointmenttext' >BOOK AN APPOINTMENT</p>
            <p className='sumitkesarwanitext' >SANKALP JADHAV</p>
            <p className='professiontext' > Profession : Risk Analyst</p>
            <p className='agetext' > Age : 19 years</p>
            <p className='descriptiontext' > Sankalp Jadhav is an experienced risk analyst 
                with over 2 years <br></br>of expertise in identifying and managing financial risks. 
                He specializes <br></br>in assessing market volatility and implementing strategies to <br></br>
                minimize potential losses. Sankalp’s analytical skills and attention<br></br> to detail 
                help clients safeguard their investments.</p>
            
            <button className='bookbuttonsumit' onClick={handlescrollthird} >BOOK AN APPOINTMENT</button>
            <img src={require('./stocks_media/cloud_down.png')} className='cloud3_1'></img>
            <img src={require('./stocks_media/cloud_down.png')} className='cloud3_2'></img>
            <button className='button1first' onClick={handlefirsttoggle} >1</button>
            <button className='button2first' onClick={handlesecondtoggle} >2</button>
            <button className='button3firstex' onClick={handlethirdtoggle} >3</button>
            


          </div>
          {scrollthirdform && (
        <div>
          <div className='firstformmain' >
                <div className='firstform' ref={formRef}  >
                    <form>
                        <p className='requestappoitmenttext'  >REQUEST AN APPOINTMENT</p>
                        <p className='namefirst' >First name</p>

                        <input type='text' 
                        className='firstnameinputfirst' 
                        placeholder='Enter first name' 
                        value={firstnamethird} 
                        onChange={(e)=>setfirstnamethird(e.target.value)}
                        ></input>

                        <p className='surnamefirst' >Surname</p>

                        <input type='text' 
                        className='surnamenameinputfirst' 
                        placeholder='Enter surname' 
                        value={surnamethird}
                        onChange={(e) => setsurnamethird(e.target.value)}
                        ></input>

                        <p className='phonenumfirst' >Name</p>

                        <input type='text' 
                        className='phonenumberinputfirst' 
                        placeholder='Enter phone number' 
                        value={phonenumthird}
                        onChange={(e) => setphonenumthird(e.target.value)}
                        ></input>

                        <p className='emailtextfirst' >Email</p>

                        <input type='text' 
                        className='emailinputfirst' 
                        placeholder='Enter email' 
                        value={emailthird}
                        onChange={(e) => setemailthird(e.target.value)}
                        ></input>

                        <p className='appointmentdatefirst' >Appointment date</p>

                        <input type='date' 
                        className='appointmentinputfirst'
                        value={appointmentdatethird}
                        onChange={(e) => setappointmentdatethird(e.target.value)}
                        ></input>

                        <p className='appointmentdatetextfirst' >Appointment time </p>

                        <input type='time' 
                        className='appointmenttimeinputfirst' 
                        value={appointmenttimethird}
                        onChange={(e) => setappointmenttimethird(e.target.value)}
                        ></input>

                        <button className='confirmbuttonfirst' onClick={handlesubmitthird} >CONFIRM APPOINTMENT</button>
                        <p className='errmessagefirst' >{errmessagethird}</p>
                        
                    </form>


                </div>
        </div>
        </div>
        )}
        </div>
        )}

    {fourthtoggle && (
        <div>
          <div className='mainboxfourth' >

          </div>
        </div>
        )}
                
            


        </div>
    </div>
  )
}

export default Appointment