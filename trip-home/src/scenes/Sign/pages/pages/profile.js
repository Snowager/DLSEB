import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

function Profile() {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  return (
    //setting the height 
    <section className="vh-100" >
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="6" className="mb-4 mb-lg-0">
          <MDBCard className="mb-4" style={{ borderRadius: '.5rem' }}>
            <MDBRow className="g-0">
    <MDBCol md="4" className="gradient-custom text-center text-black"
                style={{ borderTopLeftRadius: '.8rem', borderBottomLeftRadius: '.8rem' }}>

              {/* Setting the profile picture */}
                <img src={user ? user.photoURL : ""} alt="profile-pic" />
                {/* Setting the name */}
                <div className="profile__title">
                  {name}
                  </div>

                  {/* Information box */}
              </MDBCol>
              <MDBCol md="8">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h6">Personal Information</MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="pt-1">

                  {/* Setting the size and displaying number + email */}
                    <MDBCol size="8" className="mb-4">
                      <div>Email: {user?.email}</div>
                    </MDBCol>
                    <MDBCol size="8" className="mb-4">
                      <div>Phone Number: {user?.phoneNumber}</div>
                    </MDBCol>
                  </MDBRow>

                  {/* New section for saved trip info*/}
                  <MDBTypography tag="h6">Saved Trip Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="8" className="mb-4">
                        <MDBTypography tag="h6">placeholder</MDBTypography>
                      </MDBCol>
                      <MDBCol size="8" className="mb-4">
                        <MDBTypography tag="h6">placeholder</MDBTypography>
                      </MDBCol>
                    </MDBRow>

                    {/* Social media button that don't work yet?*/}
                  <div className="d-flex justify-content-start">
                    <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                    <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                    <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                  </div>
                  <button className="profile__btn" onClick={logout}>
                    Logout
                    </button>

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