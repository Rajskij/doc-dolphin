import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

function Results() {
    const [results, setResults] = useState();
    const [page, setPage] = useState(1);
    const { user } = useAuthContext();

    useEffect(() => {
        async function getResults() {
            const response = await fetch(`http://localhost:8000/api/results/${user.id}?page=${page}&limit=10`);
            const json = await response.json();

            console.log(json.results);
            setResults(json.results);
        }
        getResults()
    }, []);

    return (
        <div className="grid grid-cols-2">
            <div className="">
                <h1>Results: </h1>
                {results && results.map(result => (
                    <Card key={result._id} className="@container/card min-h-50">
                        <CardHeader className='flex items-center justify-between'>
                            <CardTitle>
                                <h1 className="text-primary">Test Summery Report</h1>
                            </CardTitle>
                            <CardAction>
                                <Button variant='secondary' className='mr-4' >
                                    Stop
                                </Button>
                                <Button>
                                    Save
                                </Button>
                            </CardAction>
                        </CardHeader>
                        <p className="truncate px-3">{result.report}</p>
                    </Card>
                ))}
            </div>
            <div className="bg-red-300">
                <h1>Results: </h1>

            </div>
        </div>
    );
}

export default Results;

{/* <li key={result._id}>
                        <h5>Result id: {result._id}</h5>
                        <p>Result data: {result.report}</p>
                        <Button ><Trash /></Button>
                    </li> */}