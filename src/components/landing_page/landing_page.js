import './landing_page.css';
import React from "react";
import PersonForm from '../form/form';
import RandomNameGenerator from '../random_names/random_name';

const LandingPage = () => {
    return (
        <>
            <PersonForm />
            <RandomNameGenerator/>
        </>
    );
}

export default LandingPage;
