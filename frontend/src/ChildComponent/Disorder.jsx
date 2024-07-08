import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import './Disorder.css';

const Disorder = () => {
   const [DisorderDetails, setDisorderDetails] = useState({
      Name: '',
      Description: ''
   });
   const [ans, setAns] = useState('');

   const userData = JSON.parse(localStorage.getItem('USER'));
   console.log(userData);

   useEffect(() => {
      console.log("Use Effect");

      const fetchData = async () => {
         try {
            const queryParams = new URLSearchParams({ ID: userData.ID }).toString();
            const response = await fetch(`http://localhost:5000/child/disorder?${queryParams}`, {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json'
               }
            });

            const data = await response.json();
            console.log("Data received");
            console.log(data);

            setDisorderDetails({
               Name: data[0].TYPE,
               Description: data[0].DESCRIPTION
            });
            console.log("Details");
            console.log(DisorderDetails);
         } catch (error) {
            console.log(error);
         }
      };

      fetchData();
   }, []);

   const generateDisorderDetails = async () => {
      console.log("Generating disorder details");
      console.log(DisorderDetails.Name);
      try {
         const response = await axios({
            method: 'POST',
            url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDYuRJ9qvb47Q0Jspl1g3Ey4jNrRHTUe9g',
            data: {
               contents: [
                  {
                     parts: [
                        { text: "Explain more about " + DisorderDetails.Name }
                     ]
                  }
               ]
            }
         });

         console.log(response.data.candidates[0].content.parts[0].text);
         setAns(response.data.candidates[0].content.parts[0].text);
      } catch (error) {
         console.error("Error generating disorder details", error);
      }
   };

   return (
      <div className='disorder'>
         <Navbar />
         <div className='disorder-item'>
            <h1>{DisorderDetails.Name}</h1>
            <p>{DisorderDetails.Description}</p>
         </div>
         <div className='disorder-item-details'>
            <button onClick={generateDisorderDetails}>
               Want to know more about the disorder
            </button>
            <div className='answer' dangerouslySetInnerHTML={{ __html: ans }} />
         </div>
      </div>
   );
};

export default Disorder;
