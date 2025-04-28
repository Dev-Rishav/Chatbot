import axios from "axios"

const helper=async(text)=>{
    try {
        

        const res=await axios.post("https://101f-35-199-155-126.ngrok-free.app/predict",{
            "question":text
        },{
            headers:{ "Content-Type": "application/json"}

        })

        console.log("the response from the api is",res.data);
        return res.data;
        
    } catch (error) {
        console.error("Error occured while fetching",error);
        throw error;
        
    }

}

export default helper;