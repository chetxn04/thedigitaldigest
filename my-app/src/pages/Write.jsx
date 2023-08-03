import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";

const Write = () => {
    const state = useLocation().state;
    const [value, setValue] = useState(state?.desc || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || "");

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const imageURL = await upload();
        try {
            state
                ? await axios.put(`/posts/${state.id}`, {
                    title,
                    desc: value,
                    cat,
                    Image: file ? imageURL : "",
                })
                : await axios.post(`/posts/`, {
                    title,
                    desc: value,
                    cat,
                    Image: file ? imageURL : "",
                    date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                });
        } catch (err) {
            console.log(err);
        }
    };

    console.log(value);
    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={e => setTitle(e.target.value)}
                />
                <div className="editorContainer">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b> Draft
                    </span>
                    <span>
                        <b>Visibility: </b> Public
                    </span>

                    <input style = {{display:"none"}} type="file" id="file" name = "" onChange={e=>setFile(e.target.files[0])}/>
                    <label className = "file" htmlFor="file">Upload Image</label>
                <div className="buttons">
                    <button>Save as a draft</button>
                    <button onClick={handleClick}>Publish</button>
                </div>
                </div>
                <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                    <input type = "radio" checked={cat === "art"}name = "cat" value="art" id = "art"  onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="art">Art</label></div>
                    <div className="cat">
                    <input type = "radio" checked={cat === "IOS"}name = "cat" value="IOS" id = "IOS"  onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="IOS">IOS</label></div>
                    <div className="cat">
                    <input type = "radio" checked={cat === "Android"}name = "cat" value="Android" id = "Android"  onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="Android">Android</label></div>
                    <div className="cat">
                    <input type = "radio" checked={cat === "UX/UI"}name = "cat" value="UX/UI" id = "UX/UI"  onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="UX/UI">UX/UI</label></div>
                    <div className="cat">
                    <input type = "radio" checked={cat === "Cinema"}name = "cat" value="Cinema" id = "Cinema"  onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="Cinema">Cinema</label></div>
                    <div className="cat">
                    <input type = "radio" checked={cat === "AI"}name = "cat" value="AI" id = "AI"  onChange={e=>setCat(e.target.value)}/>
                    <label htmlFor="AI">Ai</label></div>
                    
                    
                </div>
            </div>
        </div>
    );
};

export default Write //