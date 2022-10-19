import React, {useState, useEffect} from "react"; 
	import './App.css';
	import Axios from 'axios'
	
	function App() {
	
	  const [student, setStudent] = useState({
	    userName: "",
	    roll_no: "",
	    stdClass: "",
	    tsub: "",
		age: ""
	  });
	
	  const [studentList, setStudentList] = useState([])
	  const [updStudent, setUpdStudent] = useState({
	    userName: "",
	    roll_no: "",
	    stdClass: "",
	    tsub: "",
		age: ""
	  })
	
	  useEffect(() => {
	    Axios.get("http://localhost:3001/api/get").then((response) => {
	      setStudentList(response.data);
	      console.log(studentList);
	    })
	  },[])
	
	
	  // const [fname, setFname] = useState("");
	  // const [lname, setLname] = useState("");
	  // const [rollno, setRollno] = useState("");
	  // const [branch, setBranch] = useState("");
	
	  const submitData = () => {
	
	       Axios.post("http://localhost:3001/api/insert", {userName: student.userName, roll_no: student.roll_no, stdClass: student.stdClass,tsub: student.tsub, age: student.age});
	
	       setStudentList([...studentList,{userName: student.userName, roll_no: student.roll_no, stdClass: student.stdClass,tsub: student.tsub, age: student.age}])
	  };
	
	  const studentData = (e) => {
	       setStudent({...student,[e.target.name]:e.target.value})
	       console.log(student)
	  }
	
	  const deleteData = (roll_no) => {
	    Axios.delete(`http://localhost:3001/api/delete/${roll_no}`);
	  }
	
	  const updateData = (roll_no) => {
	    Axios.put("http://localhost:3001/api/update", {
			userName: student.userName, roll_no: student.roll_no, stdClass: student.stdClass,tsub: student.tsub, age: student.age
	      
	    });
	    setUpdStudent({
			userName: "",
			roll_no: "",
			stdClass: "",
			tsub: "",
			age: ""
	    })
	  
	
	  }
	
	  const upStudentData = (e) => {
	     setUpdStudent({...updStudent, [e.target.name]:e.target.value})
	     console.log(updStudent)
	
	  }
	
	  return (
	    <div className="App">
	      <h1>STUDENT APPLICATION</h1>
	      
	      <div className="form">
	      <label>Full Name:</label>
	      <input type="text" name="userName" onChange={(e)=> {
	        studentData(e)
	      }}/>
	      <br></br>
	      <label>Roll no.:</label>
	      <input type="number" name="roll_no" onChange={(e)=> {
	        studentData(e)
	      }}/>
	      <br></br>
	      <label>Class:</label>
	      <input type="number" name="stdClass" onChange={(e)=> {
	        studentData(e)
	      }}/>
	      <br></br>
	      <label>Total subjets:</label>
	      <input type="number" name="tsub" onChange={(e)=> {
	        studentData(e)
	      }}/>
		  <br></br>
	      <label>Age:</label>
	      <input type="number" name="age" onChange={(e)=> {
	        studentData(e)
	      }}/>
	
	      <button onClick={submitData}>SUBMIT</button>
	
	
	
	      </div>
	
	       
	       
	      <div className="container">
	
	      <table>
	      <tr>
	      <th>ROLL NUMBER</th>
	      <th>FULL NAME</th>
	      <th>CLASS</th>
	      <th>TOTAL SUBJECTS</th>
		  <th>AGE</th>
	      </tr>
	      {studentList.map((val) => {
	          return (
	          
	          
	          
	          <tr key={val.roll_no}> 
	
	          <td>{val.roll_no}</td>
	          <td>{val.userName}</td>
	          <td>{val.stdClass}</td>
	          <td>{val.tsub}</td>
			  <td>{val.age}</td>
	          
	
	          </tr>
	
	          
	          )
	        
	        })}
	
	        </table>
	        </div>
	
	        <div className="card-cont">
	        {studentList.map((val) => {
	          return (
	          
	            <div className="card">
	          <div key={val.roll_no}>
	          <h1>{val.fname} {val.lname} </h1>
	          <p>{val.roll_no}</p>
	          <p>{val.branch}</p>
	
	          <div className="input-cont">
	          <input type="text" name='userName' placeholder="Full name" className="updateInput" onChange={(e) => {upStudentData(e)}}/>
	          <input type="text" name='stdClass' placeholder="Class" className="updateInput" onChange={(e) => {upStudentData(e)}}/>
	          <input type="text" name='roll_number' placeholder={"( "+val.roll_no + " )"} className="updateInput" onChange={(e) => {upStudentData(e)}}/>
	          <input type="text" name='tsub' placeholder="Total Subjects" className="updateInput" onChange={(e) => {upStudentData(e)}}/>
			  <input type="text" name='age' placeholder="Age" className="updateInput" onChange={(e) => {upStudentData(e)}}/>
	          <br></br>
	          <button onClick={(e) => {updateData(val.roll_no)}}>Update</button>
	          <button onClick={(e)=>{deleteData(val.roll_no)}}>Delete</button>
	          </div>
	
	
	          </div>
	          </div>
	          )
	        
	        })}
	
	
	
	      </div>
	
	
	      
	       
	
	
	      
	   
	
	    </div>
	  );
	}
	
	export default App;

