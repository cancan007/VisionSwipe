
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
            <div className="detail text-black w-4/5 md:w-3/5">
                            <p className="detail-title">当ウェブサイトにおける個人情報の取扱いについて</p>
                            <p className="detail-text">株式会社Vision Swipe(以下、「当社」といいます。)は、お客様及び特定の個人を識別できる情報(以下「個人情報」という)を適切に取り扱い、保護することが企業の社会的責任であると認識し、次の取り組みを実施いたします。</p>
                            <p className="detail-title">1. 利用目的</p>
                            <p className="detail-text">個人情報は、当社の商品･サービス・株式などに関するご案内、お問い合わせへの対応などの目的のために利用いたします。
                                取得した個人情報を、これらの目的以外に無断で利用することはございません。
                                また、各種お問い合わせやご意見を頂戴した際に入手した個人情報につきましては、その返答や対応以外の目的に無断で利用することはございません。</p>
                            <p className="detail-title">2. 個人情報の収集</p>
                            <p className="detail-text">個人情報を収集させていただく場合は、その収集目的をお知らせした上で、収集目的に必要な範囲内で、適法かつ公正な手段により収集させていただきます。</p>
                            <p className="detail-title">3. 第三者提供の制限および業務委託先の管理</p>
                            <p className="detail-text">個人情報は安全かつ適正な管理を行うとともに、次の場合を除き、業務委託先および提携先以外の第三者に開示・提供することはございません。    
                                同意がある場合
                                警察、裁判所、検察庁などの公的機関から法令等に基づく照会を受けた場合
                                生命、健康、財産等の重大な利益を保護するために必要と当社が判断した場合
                                お問合せをいただき、その内容が業務委託先および提携先企業から直接回答させていただくことが適当と当社が判断した場合
                                統計的なデータとして、個人情報を識別できない状態に加工した場合
                                なお個人情報の処理を外部へ委託する場合は、漏えいや再提供を行わないように、委託先と秘密保持契約を締結し、その上で適切な管理をいたします。</p>
                            <p className="detail-title">4. 個人情報への改ざん等の防止措置</p>
                            <p className="detail-text">個人情報への不正アクセス、紛失、破壊、改ざんおよび漏えい等の防止のため、適正なセキュリティ対策により安全対策を講じます。</p>
                            <p className="detail-title">5. 個人情報の確認・訂正等</p>
                            <p className="detail-text">個人情報の確認･訂正等を希望される場合は、下記お問合せ先までご連絡いただければ、ご本人様からの希望であることを確認の上、合理的な範囲で速やかに対応いたします。</p>
                            <p className="detail-title">6. 管理体制</p>
                            <p className="detail-text">全社的な個人情報保護に関する取り組みのための体制を整備するとともに、社員に対する教育と啓発を継続的に実施いたします。</p>
                            <p className="detail-title">7. 法令遵守</p>
                            <p className="detail-text">個人情報を取り扱うにあたり、個人情報保護に関する関係法令を遵守するとともに、本ポリシーの内容は継続的に見直し、改善に努めます。</p>
                            <p className="detail-title">8. リンクサイトでの個人情報保護</p>
                            <p className="detail-text">当社は、当社のウェブサイトからリンクしている他のウェブサイトにおける個人情報等の保護について責任を負うことはできません。</p>
                            <p className="detail-title">9. 免責</p>
                            <p className="detail-text">当社は、虚偽の事実または他人の個人情報を使用された場合等、不正使用については一切の責任を負いません。</p>
                            <p className="detail-title">10. お問い合わせ先</p>
                            <p className="detail-text">個人情報の内容に関するお問い合わせは下記までご連絡ください。</p>
                                <p>株式会社Vision Swipe 
                                Email: visionswipe777@gmail.com</p>
                            <p className="detail-text-end">以上</p>
                        </div>
        </section>
        <footer className="flex flex-row justify-center mt-10">
          <p className="text-black text-sm">CopyRight (C) 2022 VisionSwipe All rights reserved.</p>
        </footer>
    </body>
  )
}

