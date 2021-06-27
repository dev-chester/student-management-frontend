import Head from 'next/head';
import { useForm } from "react-hook-form";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TableResults from '../components/TableResults';


export default function Home() {

  //let data = [];
  const [data, setData] = useState([]);

  const { register, handleSubmit, errors, reset } = useForm();
  

  async function onSubmitForm(values) {
    console.log(values);
    let emails = values.emails.split(",");

    let stringParams = "";
    emails.forEach(e => {
      if (e === "") return;
      stringParams = `${stringParams}tutor=${e}&`
    });
    console.log(stringParams);
    stringParams = stringParams.slice(0, -1); 
    let config = {
      method: 'get',
      url: `https://student-mgmt-backend.herokuapp.com/api/getcommonstudents?${stringParams}`,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    try {
      const response = await axios(config);
      console.log(response);
      if (response.status == 200) { 
        setData(response.data);
      }
    } catch (err) { }
  }

  return (
    <div class="ml-5 mt-5">
      <form class="w-full max-w-xl" onSubmit={handleSubmit(onSubmitForm)} method="GET">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">

            <label for="name" >
              Tutors' Email (separated by comma)
            </label>
            <textarea class="w-full"
              rows="5"
              type="text"
              name="name"
              {...register("emails")}

              placeholder="Full name"
            />
          </div>
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mt-6 px-4 border border-blue-700 rounded">
              Submit
            </button>

          </div>
        </div>

      </form>
      <hr/>
      <TableResults info={data}/>
    </div>
  )
}
