import axios from "axios"

const helper=async(text)=>{
    try {
        
        console.log("prompt is: ",text);
        
        const res=await axios.post("http://127.0.0.1:8000/chat",{
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