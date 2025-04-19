import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_CUSTOMER_POST } from "../utils/mutations";

import Auth from "../utils/auth";

const addCustomerPostForm = () => {
    const [CustomerPostForm, setCustomerPost] = useState({
        description: '',
        image: '',
        budget: 0,
        firstName: '',
        lastName: '',
    });

    const [addCustomerPost, { error, data }] = useMutation(ADD_CUSTOMER_POST);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
    };

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            
        } catch (err) {
            console.error(err);
        }
    };

    return (
        
    )
}