import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [profileData, setProfileData] = useState({
        NAME: '',
        DOB: '',
        AGE: '',
        CONTACT_NO: '',
        EMAIL: '',
        P_EMAIL: '',
        STREET: '',
        CITY: '',
        POSTAL_CODE: '',
        DEGREE: '',
        FIELD_OF_SPEC: '',
        INSTITUTION: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gender, setGender] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const userDataString = localStorage.getItem('USER');
            if (!userDataString) {
                setError('USER not found in local storage');
                setLoading(false);
                return;
            }

            const userData = JSON.parse(userDataString);

            try {
                const response = await fetch('http://localhost:5000/reg/user-info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ID: userData.ID, TYPE: userData.TYPE })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setProfileData({
                    NAME: data[0].NAME,
                    DOB: data[0].DOB,
                    AGE: data[0].AGE,
                    CONTACT_NO: data[0].CONTACT_NO,
                    EMAIL: data[0].EMAIL,
                    P_EMAIL: data[0].P_EMAIL,
                    STREET: data[0].STREET,
                    CITY: data[0].CITY,
                    POSTAL_CODE: data[0].POSTAL_CODE,
                    DEGREE: data[0].DEGREE,
                    FIELD_OF_SPEC: data[0].FIELD_OF_SPEC,
                    INSTITUTION: data[0].INSTITUTION,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const fetchGenderData = async () => {
        const genderResponse = await fetch(`https://api.genderapi.io/api/?name=${encodeURIComponent(profileData.NAME)}&key=667faf277a781c44944e8b13`);
        const genderData = await genderResponse.json();
        if (genderData.status && genderData.gender !== 'null') {
            setGender(genderData.gender === 'male' ? 'boy' : 'girl');
        } else {
            setGender('boy');
        }
        console.log('G', gender);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Profile Data:', profileData);
        // Call fetchGenderData function
        await fetchGenderData();
        // Add code here to handle form submission, e.g., send data to the server
    };

    const handleDelete = () => {
        console.log('Delete Account');
        // Add code here to handle account deletion
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="user-profile">
            <div className="avatar">
                <img src={`https://avatar.iran.liara.run/public/${gender}?username=${profileData.NAME}`} alt='Avatar' />
            </div>
            <div className="profile-info">
                <h1>{profileData.NAME}</h1>
            </div>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="profile-form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="NAME"
                        placeholder="Enter your Name"
                        value={profileData.NAME}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Email Address</label>
                    <input
                        type="text"
                        name="EMAIL"
                        placeholder="Email Address"
                        disabled
                        value={profileData.EMAIL}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="CONTACT_NO"
                        placeholder="Enter contact number"
                        value={profileData.CONTACT_NO}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Parent Email ID</label>
                    <input
                        type="email"
                        name="P_EMAIL"
                        disabled
                        value={profileData.P_EMAIL}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Street</label>
                    <input
                        type="text"
                        name="STREET"
                        placeholder="Enter street"
                        value={profileData.STREET}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="CITY"
                        placeholder="Enter city"
                        value={profileData.CITY}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Postal Code</label>
                    <input
                        type="number"
                        name="POSTAL_CODE"
                        placeholder="Enter postal code"
                        value={profileData.POSTAL_CODE}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Institution</label>
                    <input
                        type="text"
                        name="INSTITUTION"
                        placeholder="Institution"
                        value={profileData.INSTITUTION}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Degree</label>
                    <input
                        type="text"
                        name="DEGREE"
                        placeholder="Degree"
                        value={profileData.DEGREE}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Field of Specialization</label>
                    <input
                        type="text"
                        name="FIELD_OF_SPEC"
                        placeholder="Field of specialization"
                        value={profileData.FIELD_OF_SPEC}
                        onChange={handleChange}
                    />
                </div>
                <div className="profile-form-group">
                    <label>Age</label>
                    <input
                        type="text"
                        name="AGE"
                        placeholder="Enter your age"
                        value={profileData.AGE}
                        onChange={handleChange}
                    />
                </div>
                <div className="button-group">
                    <button type="button" className="delete-account-btn" onClick={handleDelete}>Delete Account</button>
                    <button type="submit" className="save-profile-btn">Save Profile</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
