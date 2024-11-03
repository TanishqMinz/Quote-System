import { useState, useEffect } from 'react';

function QuoteDisplay({ selectedAnswers, startOver }) {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        fetch('/api/quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answers: selectedAnswers })
        })
        .then(response => response.json())
        .then(data => setQuote(data.total_price))
        .catch(error => console.error('Error creating quote:', error));
    }, [selectedAnswers]);

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Your Quote:</h3>
            {quote !== null ? (
                <p className="text-gray-800 text-lg">Total Price: <span className="font-bold">${quote}</span></p>
            ) : (
                <p className="text-gray-500">Loading...</p>
            )}
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={startOver} 
            >Start Over</button>
        </div>
    );
}

export default QuoteDisplay;
