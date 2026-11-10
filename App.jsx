const [feedbacks, setFeedbacks] = useState([]);

const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFeedbacks = [...feedbacks, feedback];

    setFeedbacks(updatedFeedbacks);

    localStorage.setItem(
        "feedbacks",
        JSON.stringify(updatedFeedbacks)
    );

    setFeedback({
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: ""
    });
};
