import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation }  from "react-router-dom";
import './css/Register.css';
import Nav from "./Nav";

const AddLabPage = (props: {}) => {
  const navigate = useNavigate();
  const [labName, setlabName] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [field, setField] = useState("");
  const [description, setDescription] = useState("");
  const [contacts, setContacts] = useState("");
  const [userID, setUserID] = useState(0);
  const [profID, setProfID] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    switch (name) {
        case "labName":
            setlabName(value);
            break;
        case "location":
            setLocation(value);
            break;
        case "website":
            setWebsite(value);
            break;
        case "field":
            setField(value);
            break;
        case "description":
            setDescription(value);
            break;
        case "contacts":
            setContacts(value);
            break;
        default:
            break;
        }
    };

    const checkLogin = async () => {
        try {
            const {data} = await axios.get<{id: number; email: string; isProfessor: boolean; name: string, dept: String}>("https://api.ellen.newbie.sparcsandbox.com/check-login", {withCredentials: true});
            console.log(data);
            if (data.id) {
                setUserID(data.id);
                console.log(data.id);
                console.log("user" + userID);
                // fetchProfessorId();
            // console.log("Response : "+data.id);
            // setIsLoggedIn(response.data.isProfessor);
            }
        } catch (error) {
            console.error('Failed to fetch username:', error);
        }
    };
    
    useEffect(() => {
        checkLogin();
    }, []);

    useEffect(() => {
        if (userID !== 0) {
            fetchProfessorId();
        }
    }, [userID]);

    useEffect(() => {
        if (profID !== 0) {
            fetchProfessorId();
        }
    }, [profID]);
    

    const fetchProfessorId = async () => {
        try {
            console.log("userfpid" + userID);
            const { data } = await axios.post(`https://api.ellen.newbie.sparcsandbox.com/get-prof-id`, { userID });
            setProfID(data.prof_id);
            console.log("profID"+profID);
            console.log(typeof(profID));
            console.log("Prof_id"+data.prof_id)
        } catch (error) {
            console.error('Failed to fetch professor ID:', error);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = {
            labName,
            location,
            website,
            field, 
            description,
            contacts
        };
        console.log(formData);
        // console.log(lab_id);
        try {
            const response = await axios.post("https://api.ellen.newbie.sparcsandbox.com/add-lab", 
            { lab_name: labName,
              location: location,
              website: website,
              field: field,
              description: description,
              contacts: contacts,
              prof_id: profID,
            });
            console.log("data" + response.data);
            navigate("/");
        } catch (error: any) {
            console.error("There was an error registering!", error);
        }
    };

  return (
    <>
    <Nav />
        <div className="apply-page">
            <h1>Add your lab!</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="labName">Name of Lab</label>
                <input
                type="text"
                id="labName"
                name="labName"
                value={labName}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="website">Website Link</label>
                <textarea
                id="website"
                name="website"
                value={website}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="field">Field</label>
                <textarea
                id="field"
                name="field"
                value={field}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="contacts">Email</label>
                <textarea
                id="contacts"
                name="contacts"
                value={contacts}
                onChange={handleChange}
                required
                />
            </div>
            <button type="submit" className="submit-button">Submit Application</button>
            </form>
        </div>
    </>

  );
};

export default AddLabPage;

