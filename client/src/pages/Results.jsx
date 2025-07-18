import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect, useState } from "react";

function Results() {
    const [results, setResults] = useState();
    const { user } = useAuthContext();

    useEffect(() => {
        async function getResults() {
            const result = await fetch(`http://localhost:8000/api/results/${user.id}`);
            const json = await result.json();
            
            setResults(json);
        }
        getResults()
    }, []);

    return (
        <div>
            <h1>Results: </h1>
            <ul>
                {results && results.map(result => (
                    <li key={result._id}>
                        <h5>Result id: {result._id}</h5>
                        <p>Result data: {result.data}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Results;