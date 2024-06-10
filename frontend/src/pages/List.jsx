import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const List = () => {
    const [name, setName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState(null);
    const fileInputRef = useRef(null); // Create a ref for the file input

    const firebase = useFirebase();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
            console.log("Success", result);
            setCoverPic(null);
            setIsbnNumber("");
            setName("");
            setPrice("");
            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear the file input field using the ref
            }
            
            // navigate('/some-route'); // Redirect to some route after successful submission
        } catch (error) {
            console.error("Error creating new listing:", error);
        }
    };

    const handleFileChange = (e) => {
        setCoverPic(e.target.files[0]);
    };

    return (
        <div className='container mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter book name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>ISBN No.</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter ISBN number"
                        value={isbnNumber}
                        onChange={(e) => setIsbnNumber(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Cover Image</Form.Label>
                    <Form.Control
                        type="file"
                        ref={fileInputRef} // Attach the ref to the file input
                        onChange={handleFileChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Book Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter book price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create Book
                </Button>
            </Form>
        </div>
    );
};

export default List;
