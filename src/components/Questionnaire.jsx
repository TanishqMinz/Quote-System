import { useState, useEffect } from 'react';

function Questionnaire({ selectedServices, setSelectedAnswers, nextStep }) {
    const [questions, setQuestions] = useState([]);
    const [isQuoteDisabled, setIsQuoteDisabled] = useState(true)

    useEffect(() => {
        fetch('/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ service_ids: selectedServices })
        })
        .then(response => response.json())
        .then(data => setQuestions(data))
        .catch(error => console.error('Error fetching questions:', error));
    }, [selectedServices]);

    const handleAnswerChange = (questionId, answerId) => {
        setSelectedAnswers(prevState => {
            const newAnswers = { ...prevState, [questionId]: answerId };
            const allQuestionsAnswered = questions.every(q => newAnswers[q.id]);
            setIsQuoteDisabled(!allQuestionsAnswered); 
            return newAnswers;
        });
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Answer the following questions:</h3>
            {questions.map(question => (
                <div key={question.id} className="mb-4">
                    <p className="text-gray-800 font-semibold">{question.text}</p>
                    {question.answers.map(answer => (
                        <div key={answer.id} className="mb-2">
                            <input 
                                type="radio" 
                                name={`question-${question.id}`} 
                                onChange={() => handleAnswerChange(question.id, answer.id)}
                                className="mr-2"
                            />
                            <label className="text-gray-700">{answer.text} (${answer.price})</label>
                        </div>
                    ))}
                </div>
            ))}
            <button 
                onClick={nextStep}
                className={`mt-4 ${isQuoteDisabled ? 'bg-red-500' : 'bg-blue-500 hover:bg-blue-600' } text-white px-4 py-2 rounded `}
                disabled={isQuoteDisabled}
                >
                Get Quote
            </button>
        </div>
    );
}

export default Questionnaire;
