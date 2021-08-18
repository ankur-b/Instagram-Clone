import React, { useContext,useRef,useEffect,useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context as AuthContext } from "../Context/AuthContext";
import M from 'materialize-css'
import "./Navbar.css";
import { Query } from "mongoose";
const Navbar = () => {
  const searchModal = useRef(null)
  const { Signout } = useContext(AuthContext);
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(()=>{
      M.Modal.init(searchModal.current)
  },[])
  const renderList = () => {
    if (user) {
      return [
        <li>
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "black" }}
          >
            search
          </i>
        </li>,
        <li>
          <Link to="/profile">Profile</Link>
        </li>,
        <li>
          <Link to="/createpost">Createpost</Link>
        </li>,
        <li>
          <Link to="/myfollowing">My Following</Link>
        </li>,
        <li>
          <button
            class="btn waves-effect black waves-light btn-small"
            onClick={() => {
              Signout({ history });
            }}
          >
            Sign Out
          </button>
        </li>,
      ];
    } else {
      return [
        <li>
          <Link to="/login">Login</Link>
        </li>,
        <li>
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  const fetchUsers =(query)=>{
    setSearch(query)
    fetch("/search-users",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body:JSON.stringify({
        query:search
      })
    }).then(res=>res.json())
    .then(results=>{
      setUserDetails(results.user)
    })
  }
  return (
    <nav className="white">
      <div className="container">
        <div className="nav-wrapper">
          <Link to={user ? "/" : "/login"} className="brand-logo">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderList()}
          </ul>
        </div>
        <div id="modal1" className="modal" ref={searchModal} style={{color:'black'}}>
          <div className="modal-content">
            <input
              type="text"
              placeholder="search users"
              value={search}
              onChange={(e)=>fetchUsers(e.target.value)}
            />
            <ul className="collection">
              {userDetails.map(item=>{
                return <Link to={item._id === user._id ? '/profile':"/profile/"+item._id} onClick={()=>{
                  M.Modal.getInstance(searchModal.current).close()
                  setSearch("")
                }}><li className="collection-item">{item.email}</li></Link>
              })}
            </ul>
          </div>
          <div className="modal-footer" style={{marginBottom:10}}>
            <button href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>
              Close
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
