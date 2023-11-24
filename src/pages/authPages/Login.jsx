import {
  Button,
  Card,
  CardBody,
  Center,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
  useTheme,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAccessToken } from "../../redux/slices/authSlice";
import "./Login.css"
import {AiTwotoneLock} from "react-icons/ai"
import {AiOutlineMail} from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import {ImFacebook2} from "react-icons/im"
import {AiOutlineCheckCircle} from "react-icons/ai"


const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [cookies, setCookie] = useCookies(["KatalisAuth"]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const submitLoginForm = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!loginUsername || !loginPassword) {
      setLoading(false);
      toast({
        title: "Please fill all the fields",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "warning",
      });
      return;
    }
    else if (loginUsername !== "john" || loginPassword !== "123456") {
      setLoading(false);
      toast({
        title: "Wrong login Credentials",
        variant: "left-accent",
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "error",
      });
      return;
    }
    else {
      try {
        const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
          username: loginUsername,
          password: loginPassword,
        });

        if (res && res.data && res.data.access_token) {
          setLoading(false)
          const accessToken = res.data.access_token;
          dispatch(setAccessToken(accessToken));
          setCookie("KatalisAuth", accessToken, {
            path: "/",
          });
          navigate("/main/magicstudio");
        } else {
          setLoading(false)
          toast({
            title: "You are not authorized ",
            variant: "left-accent",
            position: "top",
            isClosable: true,
            duration: 2000,
            status: "error",
          });
        }
      } catch (err) {
        setLoading(false)
        toast({
          title: "Internal Server Error ",
          variant: "left-accent",
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "error",
        });
      }
    }

  };

  return (
    <div style={{width: "100wh", height: "100vh" ,display: "flex",color:"white"}}>
       <div className="left" style={{height: "100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #4F0087, #D101E4)",flex:"1"}}>
        <div  style={{position: "relative", top: "-100px", width: "500px"}}>
        
         <h1 style={{fontSize:"28px",fontWeight:"800"}}>AI for E-commerce</h1>
         <p className="p">Dont't miss out with Katalis AI, you can easily create unlimited products photos, captivating description, and attention-grabbing ads, all tailored, all tailroads to boost your sales</p>
         
        </div>
      </div>

      <div style={{flex:"1",backgroundColor:"black",color:"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:"31.25em",height:"70vh"}}>
          <h1 style={{fontSize:"1.5em",fontWeight:"500"}}>Welcome Back</h1>
          <div style={{display:"flex"}}>
          <p>Don't have an account?</p>
          <p style={{marginLeft:"5px", fontSize:"15px",color:"#9B30F3"}}>register here</p>
          </div>
          <p style={{position:"relative",top:"-5px"}}>it take less than a minute</p>



        <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid green",width:"18.75em",height:"2.75em",borderRadius:"7px",marginTop:"1.25em"}}>
          <div><AiOutlineMail style={{fontSize:"1.5rem",marginLeft:"0.3em"}}/></div>
          <input type="email" placeholder="John@gmail.com" style={{width:"315px",height:"30px",border:"none",outline:"none",backgroundColor:"black",paddingLeft:"0.7rem"}}
            onChange={(e)=>{
              setLoginUsername(e.target.value)
            }}
          />
        </div>

        <div style={{display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid green",width:"300px",height:"44px",borderRadius:"7px",marginTop:"20px"}}>
          <div><AiTwotoneLock style={{fontSize:"1.5rem",marginLeft:"0.3em"}}/></div>
          <input type="password" placeholder="XXXXXXXX" style={{width:"300px",height:"30px",border:"none",outline:"none",backgroundColor:"black",paddingLeft:"0.7rem"}}
          onChange={(e)=>{
            setLoginPassword(e.target.value)
          }}
          />
        </div>

        <div style={{display:"flex",marginTop:"2.18em",width:"100%"}}>
          <input type="checkbox" />
          <label style={{marginLeft:"10px",flex:"2"}}>Remember me</label>

          <p style={{color:"#9B30F3",flex:"1"}}>Forgot Password?</p>
        </div>
        <Button style={{width:"300px",marginTop:"20px",backgroundColor:"#9B30F3"}}
        onClick={submitLoginForm}
        >Login</Button>
        <p style={{marginTop:"15px"}}> Or continue with</p>
        <div style={{display:"flex",marginTop:"1rem"}}>
          <FcGoogle style={{fontSize:"2rem"}}/>
          <ImFacebook2 style={{marginLeft:"1rem",fontSize:"2rem"}}/>
        </div>
        </div>
        
        </div>
      </div>
     
    </div>
  );
};

export default Login;
