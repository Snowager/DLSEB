import React from 'react';
import Zac from '../../images/Zac.jpg';
import Nate from '../../images/Nate.png';
import Cole from '../../images/Cole.png';
import Niko from '../../images/Niko.png';
import Tiffany from '../../images/Tiffany.png';
import Rachel from '../../images/Rachel.png';
import Alex from '../../images/Alex.png';
import "../styles/about.css";
import Navbar from '../../../Splash/components/fragments/navbar';

export function About() {
    return (
        <div>
            <Navbar />

            <div class="trip-description-background">
                <h2 className="titles">What is TR!P?</h2>
                <p>
                    Welcome to TR!P, where we make trip planning easy and stress-free!
                    At TR!P, we understand that planning a trip can be overwhelming and time-consuming.
                    That's why we're here to help you plan the perfect getaway, whether it's a night on the town or an adventure overseas.
                    On our website, you can search for destinations and plan your itinerary all in one place.
                    We believe that travel has the power to transform and enrich our lives, and we're dedicated to
                    helping you make the most of your trip. Whether you're a seasoned traveler or a first-time adventurer,
                    we're here to help you plan your next unforgettable journey.
                </p>
            </div>

            <div class='trip-team-background'>
                <h2 className='titles'>Meet the TR!P Team</h2>
                <div className='container'>
                    <div className='row'>
                        <div className='col team-member-col'>
                            <div className='row center-sims'>
                                <img className='sims' src={Cole} alt="Cole" />
                            </div>
                            <div className='row'>
                                <h4 className='header-sims'>Cole Robinson</h4>
                            </div>
                            <div className='row splitters-margin'>
                                <div className="splitters-border"></div>
                            </div>
                            <div className='row team-member-skills-title'>
                                <p className='team-member-skills-description'> Roles: </p>
                                <p> - Coordinator </p>
                                <p className='two-roles'> - Software Developer </p>
                            </div>
                        </div>

                        <div className='col team-member-col'>
                            <div className='row center-sims'>
                                <img className='sims' src={Tiffany} alt="Tiffany" />
                            </div>
                            <div className='row'>
                                <h4 className='header-sims'>Tiffany Kouakou</h4>
                            </div>
                            <div className='row splitters-margin'>
                                <div className="splitters-border"></div>
                            </div>
                            <div className='row team-member-skills-title'>
                                <p className='team-member-skills-description'> Role: </p>
                                <p> - Business Analyst </p>
                                <p> - Database Architect </p>
                                <p> - Security Engineer </p>
                            </div>
                        </div>

                        <div className='col team-member-col'>
                            <div className='row center-sims'>
                                <img className='sims' src={Niko} alt="Niko" />
                            </div>
                            <div className='row'>
                                <h4 className='header-sims'>Niko Antuna</h4>
                            </div>
                            <div className='row splitters-margin'>
                                <div className="splitters-border"></div>
                            </div>
                            <div className='row team-member-skills-title'>
                                <p className='team-member-skills-description'> Role: </p>
                                <p> - Web Developer </p>
                                <p> - Software Developer </p>
                                <p> - UI / UX Designer </p>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col team-member-col'>
                            <div className='row center-sims'>
                                <img className='sims' src={Alex} alt="Alex" />
                            </div>
                            <div className='row'>
                                <h4 className='header-sims'>Alex Bradberry</h4>
                            </div>
                            <div className='row splitters-margin'>
                                <div className="splitters-border"></div>
                            </div>
                            <div className='row team-member-skills-title'>
                                <p className='team-member-skills-description'> Role: </p>
                                <p> - Database Architect </p>
                                <p> - Software Developer </p>
                                <p> - Network Architect </p>
                            </div>
                        </div>

                        <div className='col team-member-col'>
                            <div className='row center-sims'>
                                <img className='sims' src={Rachel} alt="Rachel" />
                            </div>
                            <div className='row'>
                                <h4 className='header-sims'>Rachel Godina</h4>
                            </div>
                            <div className='row splitters-margin'>
                                <div className="splitters-border"></div>
                            </div>
                            <div className='row team-member-skills-title'>
                                <p className='team-member-skills-description'> Role: </p>
                                <p> - Business Analyst </p>
                                <p> - Database Architect </p>
                                <p> - Security Engineer </p>
                            </div>
                        </div>

                        <div className='col team-member-col'>
                            <div className='row center-sims'>
                                <img className='sims' src={Nate} alt="1" />
                            </div>
                            <div className='row'>
                                <h4 className='header-sims'>Nate Burdick</h4>
                            </div>
                            <div className='row splitters-margin'>
                                <div className="splitters-border"></div>
                            </div>
                            <div className='row team-member-skills-title'>
                                <p className='team-member-skills-description'> Role: </p>
                                <p> - Web Developer </p>
                                <p className='two-roles'> - UI / UX Designer </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default About;
