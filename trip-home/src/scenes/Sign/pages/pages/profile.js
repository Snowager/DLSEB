import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import Saved_activities from '../../components/dashboardFragments/saved_activities.js'
import Saved_trips from '../../components/dashboardFragments/saved_trips.js'
import user_data from '../../../TestingDatabase/pages/user.json';
import {useLazyQuery} from '@apollo/client';
import { GET_TRIP_USER_BY_EMAIL } from "../../../TestingDatabase/GraphQL/queries.js";
import { Link } from 'react-router-dom';
import Navbar from "../../../Splash/components/fragments/navbar.js";

function Profile() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [found, setFound] = useState(false);

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      user_data.name = data.name;
      user_data.email = data.email;
      get_user();
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  //needed so that react doesn't infinitely re-render
  const update_found = () => {
    setFound(true)
}

  function updateJson () {
    user_data.id = "0";
    user_data.name = "name";
    user_data.email = "email";
  }

  //gets user data from the postgresql database
  const [get_user, {data: db_data, loading: db_loading, error: db_error}] = useLazyQuery(GET_TRIP_USER_BY_EMAIL, {
    variables: {email: user_data.email},
    onCompleted: update_found
  })

  //once data has been gathered from the postgresql database this updates the user.json file with apporpriate id
  useEffect(() => {
    if(found){user_data.id = db_data.trip_user[0].user_id}
  }, [found])

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    //setting the height 
    <section className="vh-100" >
      <Navbar />
    <MDBContainer className="py-5 h-100" >
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="6" className="mb-4 mb-lg-0" >
          <MDBCard className="mb-4 text-white" style={{ borderRadius: '.5rem', backgroundColor: 'black' }}>
            <MDBRow className="g-0">
    <MDBCol md="4" className="gradient-custom text-center text-black"
                style={{ borderTopLeftRadius: '.4rem', borderBottomLeftRadius: '.4rem' }}>

              {/* Setting the profile picture */}
                <img src={user ? user.photoURL : ""} alt="profile-pic" 
                className="my-5" style={{ width: '100' }} fluid />
                <hr className="mt-0 mb-4" />
                {/* Setting the name */}
                <div className="profile__title">
                  {name}
                  </div>
                 
                
      
                  {/* Information box */}
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody className="p-4">
                <div class="text-center">
                  <MDBTypography tag="h6">Personal Information</MDBTypography>
                  </div>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">
                  {/* Setting the size and displaying number + email */}
                    <MDBCol size="10" className="mb-4">
                      <div>Email: {user?.email}</div>
                    </MDBCol>
                    <MDBCol size="10" className="mb-4">
                      <div>Phone Number: {user?.phone_Number}</div>
                    </MDBCol>
                    <MDBCol size="10" className="mb-4">
                      <div>Location: {user?.location}</div>
                    </MDBCol>
    
                  </MDBRow>

                  {/* New section for saved trip info*/}
                  <div class="text-center">
                  <MDBTypography tag="h6">Saved Trip Information</MDBTypography>
                  </div>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="10" className="mb-4">
                        {found ? (<MDBTypography tag="h6"><Saved_activities email={user?.email} /></MDBTypography>): null}
                      </MDBCol>
                      <MDBCol size="10" className="mb-4">
                        {found ? (<MDBTypography tag="h6"><Saved_trips email={user?.email}/></MDBTypography>): null}
                      </MDBCol>
                    </MDBRow>

                    {/* Social media button that don't work yet?*/}
                  <div className="d-flex justify-content-start">
                    <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                    <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                    <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                  </div>
                  <div class="text-center">
                  <button className="btn--primary" onClick={logout}>
                    Log out
                    </button>
                  </div>

                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  </section>
  );
}
export default Profile;
