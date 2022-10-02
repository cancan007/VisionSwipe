
import React , {useEffect, useRef, useState}from 'react'
import vsIcon from "../assets/vs-icon.png";
import "../contact.css"
import emailjs from 'emailjs-com';
import Alert from '../components/Alert';

export const Contact = () => {
    const [company, setCompany] = useState<string>()
    const [name, setName] = useState<string>()
    const [mail, setMail] =useState<string>()
    const [message, setMessage] = useState<string>();
    const [flag, setFlag] =useState<boolean>(false);
    const [flag2, setFlag2] = useState<boolean>(false);
    const [flag3, setFlag3] = useState<boolean>(false);
    const suceeded_message = "Succeeded to send mail!"
    const failed_message = "Failed to send mail";
    const missed_message = "Please fill forms with red dots at least";

    const templateId = process.env.REACT_APP_EMAILJS_TEMPID;
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICEID;
    const userId = process.env.REACT_APP_EMAILJS_USERID;
    const contactRef:any = useRef(null)

  const sendEmail = (e:any) =>{
    e.preventDefault();
    if(!templateId || !serviceId || !userId) return console.error("You don't have env value")
    
    if(name && mail && message){
        emailjs.sendForm(
            serviceId,
            templateId,
            contactRef.current,
            userId
        ).then(()=>{
          setCompany("")
            setName("");
            setMail("")
            setMessage("")
            setFlag(true)
            
        }).catch(()=>setFlag2(true))
    }else{
        setFlag3(true)
    }
    
  }

  useEffect(()=>{
    if(flag === true || flag2 === true || flag3 === true){
        setTimeout(()=>{
            setFlag(false)
            setFlag2(false)
            setFlag3(false)
        },5000)
    }

  },[flag, flag2, flag3])

  return (
    <body className="flex flex-col items-center">
        <header className="w-full flex flex-row justify-end">
            <a href="/" className="w-1/4 flex flex-row justify-end m-5">
            <img className="w-1/2 h-auto object-cover" src={vsIcon}/>
            </a>
        </header>
        <section className="w-full flex flex-col items-center self-center">
        
        
            <p className="text-black text-6xl">Contact</p>
            <div className="flex flex-row p-5">
            <p className="text-black home-letter">home</p>
            <p className="text-black">contact</p>
            </div>
          <form ref={contactRef} onSubmit={(e:any)=>sendEmail(e)} className=" w-4/5 md:w-3/5 text-black mb-3">
            <hr/>
            <div className="name-form flex flex-row h-16 border-none items-center">
              <div className="bg-gray-300 w-1/4 h-full flex flex-row justify-center items-center">
                <p className='text-sm  text-center h-full flex flex-col justify-center name-label'>company</p>
              </div>
              <div className="flex flex-row justify-center w-full">
              <input value={company} onChange={(e:any)=>setCompany(e.target.value)} name="company_name" type="text" className="w-4/5 h-1/2 border-2 border-gray-300 rounded-lg text-center "/>
              </div>
            </div>
            <hr/>
            <div className="name-form flex flex-row h-16 border-none items-center">
              <div className="bg-gray-300 w-1/4 h-full flex flex-row justify-center items-center">
                <p className='text-sm  text-center h-full flex flex-col justify-center name-label'>name</p>
                <p className="text-red-600">*</p>
              </div>
              <div className="flex flex-row justify-center w-full">
              <input value={name} onChange={(e:any)=>setName(e.target.value)} name="from_name" type="text" className="w-4/5 h-1/2 border-2 border-gray-300 rounded-lg text-center "/>
              </div>
            </div>
            <hr />
            <div className="mail-form flex flex-row h-16 border-none items-center">
              <div className="bg-gray-300 w-1/4 h-full flex flex-row justify-center items-center">
                <p className='text-sm text-center h-full flex flex-col justify-center mail-label'>e-mail</p>
                <p className="text-red-600">*</p>
              </div>
              <div className="flex flex-row justify-center w-full">
              <input value={mail} onChange={(e:any)=>setMail(e.target.value)} name="customer_email" type="email" className="w-4/5 h-1/2 border-2 border-gray-300 rounded-lg text-center "/>
              </div>
            </div>
            <hr />
            <div className="inquiry-form flex flex-row h-64 border-none items-center">
              <div className="bg-gray-300 w-1/4 h-full flex flex-row justify-center items-center">
                <p className='text-sm text-center h-full flex flex-col justify-center'>Content</p>
                <p className="text-red-600">*</p>
              </div>
              <div className="flex flex-row justify-center w-full h-full py-5 message-label">
              <textarea value={message} onChange={(e:any)=>setMessage(e.target.value)} name="message" className="w-4/5 h-full p-2 border-2 border-gray-300 rounded-lg "></textarea>
              </div>
            </div>
            <hr/>
            <div className="flex flex-row justify-center mt-5">
              <button type="submit" className="w-auto m-0  text-gray-500 hover:text-white font-light rounded-lg border-2 py-2 px-5 text-2xl shadow-lg hover:shadow-none hover:bg-gray-500 ">Send</button>
            </div>
          </form>
          {/*<Alert variant="primary"  children='Succeeded to send mail!'/>*/}
          {flag ? (
                <Alert onClose={()=>setFlag(false)} variant="primary" dismissible children={suceeded_message}/>
            ) : <></>}
            {flag2 ? (
                <Alert onClose={()=>setFlag2(false)} variant="danger" dismissible children={failed_message}/>
            ): <></>}
            {flag3 ? (
                <Alert onClose={()=>setFlag3(false)} variant="danger" dismissible children={missed_message}/>
            ): <></>}
        </section>
        <footer className="flex flex-row justify-center mt-10">
          <p className="text-black text-sm">CopyRight (C) 2022 VisionSwipe All rights reserved.</p>
        </footer>
    </body>
  )
}

