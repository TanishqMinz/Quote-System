import { useState, useEffect } from 'react';


function ServiceSelection({ setSelectedServices, nextStep }) {
    const [services, setServices] = useState([]);
    const [NextDisable, setNextDisable] = useState(true)

    useEffect(() => {
        fetch('/api/services')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    const handleServiceChange = (id) => {
        setSelectedServices(prevState => {
            const selection = prevState.includes(id) ? prevState.filter(s => s !== id) : [...prevState, id]
            setNextDisable(selection.length === 0)
            return selection
        }
        );
    };

    return (
        <div className="p-4 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Select Services:</h3>
            {services.map(service => (
                <div key={service.id} className="mb-2">
                    <input 
                        type="checkbox" 
                        id={`service-${service.id}`} 
                        onChange={() => handleServiceChange(service.id)}
                        className="mr-2"
                    />
                    <label htmlFor={`service-${service.id}`} className="text-gray-700">
                        <span className="font-bold">{service.name}</span> - {service.description}
                    </label>
                </div>
            ))}
            <button 
                onClick={nextStep}
                className={` ${NextDisable ? 'bg-red-500' : 'bg-blue-500 hover:bg-blue-600'} mt-4  text-white px-4 py-2 rounded `}
                disabled={NextDisable}
                >
                Next
            </button>
        </div>
    );
}

export default ServiceSelection;