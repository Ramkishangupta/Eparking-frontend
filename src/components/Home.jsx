import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/slots'); 
                setSlots(response.data);
            } catch (err) {
                setError('Failed to fetch slots.');
            } finally {
                setLoading(false);
            }
        };

        fetchSlots();
    }, []);

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="flex flex-wrap gap-4 p-4">
            {slots.map((slot) => {
                const { slotNumber, status } = slot;
                const backgroundColor = status === 'unoccupied' ? 'bg-green-500' : 'bg-red-500';

                // Format the slot name (e.g., N1 -> North1, N2 -> North2)
                const formattedName = slotNumber.replace(/(\w)(\d+)/, (match, letter, number) => {
                    const direction = {
                        N: 'North',
                        S: 'South',
                        E: 'East',
                        W: 'West',
                    }[letter.toUpperCase()] || letter;
                    return `${direction}${number}`;
                });

                return (
                    <div
                        key={slotNumber}
                        className={`w-24 h-12 flex items-center justify-center text-white font-bold ${backgroundColor}`}
                    >
                        {formattedName}
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
