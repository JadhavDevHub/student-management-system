import React, { useEffect, useState } from "react";
import "./App.css";
import { FaUserGraduate, FaClipboardList, FaChartBar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function App() {

  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    course: "",
    department: "",
    mathMarks: "",
    scienceMarks: "",
    englishMarks: "",
    attendance: ""
  };

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  const [searchStudent, setSearchStudent] = useState("");
  const [searchAttendance, setSearchAttendance] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState({ username: "", password: "" });

  const API = "http://localhost:8081/students";

  const handleLogin = () => {
    if (login.username === "admin" && login.password === "admin") {
      setIsLoggedIn(true);
      toast.success("Login successful");
    } else {
      toast.error("Invalid credentials");
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setStudents(data);
    } catch {
      toast.error("Failed to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStudent = async () => {
    setLoading(true);

    const payload = {
      ...form,
      mathMarks: Number(form.mathMarks),
      scienceMarks: Number(form.scienceMarks),
      englishMarks: Number(form.englishMarks),
      attendance: Number(form.attendance)
    };

    try {
      if (editingId) {
        await fetch(`${API}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        toast.success("Student updated");
        setEditingId(null);
      } else {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        toast.success("Student added");
      }

      setForm(emptyForm);
      fetchStudents();

    } catch {
      toast.error("Operation failed");
    }

    setLoading(false);
  };

  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE"
      });
      toast.success("Student deleted");
      fetchStudents();
    } catch {
      toast.error("Delete failed");
    }
    setLoading(false);
  };

  const handleEdit = (s) => {
    setForm(s);
    setEditingId(s.id);
    setPage("students");
  };

  const paginate = (data) => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  const filterData = (list, search) =>
    list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  const limitedStudents = students.slice(0, 50);

  const marksData = {
    labels: limitedStudents.map(s => s.name),
    datasets: [{
      label: "Total Academic Score",
      data: limitedStudents.map(s => s.totalMarks),
      backgroundColor: "#3b82f6"
    }]
  };

  const attendanceData = {
    labels: limitedStudents.map(s => s.name),
    datasets: [{
      label: "Attendance %",
      data: limitedStudents.map(s => s.attendance),
      borderColor: "#22c55e"
    }]
  };

  if (!isLoggedIn) {
    return (
      <div className="login">
        <h2>Login</h2>
        <input placeholder="Username" onChange={(e)=>setLogin({...login, username:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=>setLogin({...login, password:e.target.value})}/>
        <button className="btn-add" onClick={handleLogin}>Login</button>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="dashboard">
      <ToastContainer />
      {loading && <div className="loader"></div>}

      <div className="sidebar">
        <h2>🎓 SMS</h2>
        <div className={`sidebar-item ${page==="dashboard"?"active":""}`} onClick={()=>setPage("dashboard")}>📊 Dashboard</div>
        <div className={`sidebar-item ${page==="students"?"active":""}`} onClick={()=>setPage("students")}><FaUserGraduate /> Students</div>
        <div className={`sidebar-item ${page==="attendance"?"active":""}`} onClick={()=>setPage("attendance")}><FaClipboardList /> Attendance</div>
        <div className={`sidebar-item ${page==="results"?"active":""}`} onClick={()=>setPage("results")}><FaChartBar /> Results</div>
      </div>

      <div className="main-content">
        <div className="topbar"><h1>Student Management System</h1></div>

        <div key={page} className="content fade-page">

          {page === "dashboard" && (
            <div className="dashboard-charts">
              <div className="chart-box"><Bar data={marksData} /></div>
              <div className="chart-box"><Line data={attendanceData} /></div>
            </div>
          )}

          {page === "students" && (
            <>
              <div className="form-box">
                <input name="name" value={form.name} placeholder="Name" onChange={handleChange}/>
                <input name="email" value={form.email} placeholder="Email" onChange={handleChange}/>
                <input name="phone" value={form.phone} placeholder="Phone" onChange={handleChange}/>
                <input name="course" value={form.course} placeholder="Course" onChange={handleChange}/>
                <input name="department" value={form.department} placeholder="Department" onChange={handleChange}/>
                <input name="mathMarks" value={form.mathMarks} placeholder="Data Science Marks" onChange={handleChange}/>
                <input name="scienceMarks" value={form.scienceMarks} placeholder="Internship Marks" onChange={handleChange}/>
                <input name="englishMarks" value={form.englishMarks} placeholder="Cloud Computing Marks" onChange={handleChange}/>
                <input name="attendance" value={form.attendance} placeholder="Attendance %" onChange={handleChange}/>
                <button className="btn-add" onClick={addStudent}>Add Student</button>
              </div>

              <div className="list-box">
                <input placeholder="Search..." value={searchStudent} onChange={(e)=>setSearchStudent(e.target.value)}/>

                {paginate(filterData(students, searchStudent)).map(s=>(
                  <div key={s.id} className="card">
                    <h3>{s.name}</h3>
                    <div className="card-right">
                      <button className="btn-edit" onClick={()=>handleEdit(s)}>Edit</button>
                      <button className="btn-delete" onClick={()=>deleteStudent(s.id)}>Delete</button>
                    </div>
                  </div>
                ))}

                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={()=>setCurrentPage(p=>Math.max(p-1,1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>

                  <button
                    className="page-btn"
                    onClick={()=>setCurrentPage(p=>p+1)}
                  >
                    Next
                  </button>
                </div>

              </div>
            </>
          )}

          {page === "attendance" && (
            <div className="list-box">
              <input placeholder="Search..." value={searchAttendance} onChange={(e)=>setSearchAttendance(e.target.value)}/>
              {paginate(filterData(students, searchAttendance)).map(s=>(
                <div key={s.id} className="card">
                  <h3>{s.name}</h3>
                  <span className={s.attendance<75?"badge-red":"badge-green"}>
                    {s.attendance}%
                  </span>
                </div>
              ))}
            </div>
          )}

          {page === "results" && (
            <div className="list-box">
              <input placeholder="Search..." value={searchResults} onChange={(e)=>setSearchResults(e.target.value)}/>
              {paginate(filterData(students, searchResults)).map(s=>(
                <div key={s.id} className="card">
                  <h3>{s.name}</h3>
                  <p>Total: {s.totalMarks}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;