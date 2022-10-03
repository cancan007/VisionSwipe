import React , {useState}from 'react'
import "../paymentForm.css"
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from "axios"

const CARD_OPTIONS : any = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}



export const PaymentForm = () => {
  const [success, setSuccess] = useState(false)
  const stripe:any = useStripe()
  const elements:any = useElements()

  const handleSubmit = async(e:any)=>{
    e.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement)
    })

    if(!error){
        try{
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:5000/payment",{
                amount:1000,  // $10
                id
            })

            if(response.data.success){
                console.log("Successful payment")
                setSuccess(true)
            }
        }catch(err){
            console.log("Error", error)
        }
    }else{
        console.log(error.message)
    }
    
  }

  return (
    <>
      {!success ? (
        <form className="w-4/5 md:w-1/2 mt-3" onSubmit={(e:any)=>handleSubmit(e)}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}/>
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
   
      ) : (
        <div>
            <h2>You succeeded to pay!</h2>
        </div>
      )}
      </>
  )
}
