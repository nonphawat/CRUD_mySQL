import Head from 'next/head'
import Image from 'next/image'
import { type } from 'os'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Axios from 'axios'

export default function Home() {

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [hobby, setHobby] = useState("");
  const [status, setStatus] = useState(0);
  const [newHobby, setNewHobby] = useState("");

  const [studentList, setStudentList] = useState([]);

  const getStudent = () => {
    Axios.get("http://localhost:3002/student").then((res) => {
      setStudentList(res.data);
    });
  }



  const inputData = async () => {
    Axios.post("http://localhost:3002/create", {
      id: id,
      name: name,
      hobby: hobby,
      status: status
    }).then(() => {
      setStudentList([
        ...studentList,
        {
          id: id,
          name: name,
          hobby: hobby,
          status: status

        }
      ])
    })



  }

  const updateHobby = (id: any) => {
    Axios.put("http://localhost:3002/update", { hobby: newHobby, id: id }).then((response) => {
      setStudentList(
        studentList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            hobby: newHobby,
            status: val.status
          } : val;
        })
      )
      console.log(studentList);
      
    })
  }
  const deleteStudent = (id: any)=> {
    Axios.delete(`http://localhost:3002/delete/${id}`).then((response) =>{
      setStudentList(
        studentList.filter((val)=>{
          return val.id !=id;
        })
      )
    })
  }

  return (
    <div className={styles.container}>

      <form onSubmit={inputData}>
        <div >
          <input type="text" id="stdId" className="form-control" placeholder="id"
            onChange={(event) => {
              setId(event.target.value)
            }}
          />
          <input type="text" id="stdName" className="form-control" placeholder="Name"
            onChange={(event) => {
              setName(event.target.value)
            }}
          />

          <input type="text" id="stdHobby" className="form-control" placeholder="Hobby"
            onChange={(event) => {
              setHobby(event.target.value)
            }}
          />


          <input type="text" id="stdStatus" className="form-control" placeholder="Status"
            onChange={(event) => {
              setStatus(Number(event.target.value))
            }}
          />

        </div>



        <button className="btn btn-outline-secondary" type="submit">Input</button>
      </form>

      <button className="btn btn-outline-secondary" onClick={getStudent}>Show</button>
      {studentList.map((val, key) => {
        return (
          <div >


            <p key={key}>Id: {val.id}</p>
            <p>Name: {val.name}</p>
            <p>Hobby: {val.hobby}</p>
            <div className="input-group ">

              <input type="text" id="stdHobby" className="form-control" placeholder="Update Hobby"
                onChange={(event) => {
                  setNewHobby(event.target.value)
                }}
              />
              <button className="btn btn-outline-secondary" onClick={() => updateHobby(val.id)}>Update</button>
            </div>
            <p>Status: {val.status}</p>
            <button className="btn btn-outline-secondary" onClick={() => deleteStudent(val.id)}>Delete</button>
            <p>_________________________________</p>

          </div>


        )




      })}


    </div >
  )
}
