import { useState } from 'react';
import ServiceSelection from './components/ServiceSelection'; 
import Questionnaire from './components/Questionnaire'; 
import QuoteDisplay from './components/QuoteDisplay';

function App() {
    const [step, setStep] = useState(1);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const nextStep = () => setStep(step + 1);
    const startOver = () => setStep(1)

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-lg w-full">
                {step === 1 && <ServiceSelection setSelectedServices={setSelectedServices} nextStep={nextStep} />}
                {step === 2 && <Questionnaire selectedServices={selectedServices} setSelectedAnswers={setSelectedAnswers} nextStep={nextStep} />}
                {step === 3 && <QuoteDisplay selectedAnswers={selectedAnswers} startOver={startOver} />}
            </div>
        </div>
    );
}

export default App;
