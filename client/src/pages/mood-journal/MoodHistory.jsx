import React, { useEffect, useState, useRef } from "react"
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Trash2, Pen, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuthContext } from "@/hooks/useAuthContext"

const API_URL = "http://localhost:8000/api/mood-journal"

function MoodHistory() {
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null)
    const [editNote, setEditNote] = useState("")
    const { user } = useAuthContext()

    const TOKEN = user.token;
    const USER_ID = user.id;
    // Fetch mood records
    const fetchData = async () => {
        try {
            const res = await fetch(`${API_URL}/${USER_ID}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            if (!res.ok) return;
            const json = await res.json()
            setData(json)
        } catch (err) {
            console.error("Fetch error:", err)
        }
    }
    const inputRef = useRef(null)

    useEffect(() => {
        if (editId && inputRef.current) {
            inputRef.current.focus()
        }
    }, [editId])

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/mood/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            })
            fetchData() // Refresh list
        } catch (err) {
            console.error("Delete error:", err)
        }
    }

    // Start editing
    const handleEdit = (id, currentNote) => {
        setEditId(id)
        setEditNote(currentNote)
    }

    // Save updated note
    const handleSave = async (record) => {
        try {
            await fetch(`${API_URL}/mood/${record._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
                body: JSON.stringify({
                    mood: record.mood,
                    weather: record.weather,
                    activities: record.activities,
                    note: editNote,
                }),
            })
            setEditId(null)
            fetchData()
        } catch (err) {
            console.error("Update error:", err)
        }
    }

    return (
        <div className="min-h-[calc(100vh-11rem)]">
            <h1 className="text-2xl font-bold mb-4">Mood History</h1>
            <Table className="min-w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Mood</TableHead>
                        <TableHead>Weather</TableHead>
                        <TableHead>Activities</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No entries found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((entry) => (
                            <TableRow key={entry._id}>
                                <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                                <TableCell>{entry.mood}</TableCell>
                                <TableCell>{entry.weather}</TableCell>

                                {/* Activity Pills */}
                                <TableCell>
                                    <div className="flex flex-wrap gap-1 max-h-[80px] overflow-y-auto">
                                        {entry.activities.map((activity, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-muted px-2 py-0.5 rounded-full border text-muted-foreground"
                                            >
                                                {activity}
                                            </span>
                                        ))}
                                    </div>
                                </TableCell>

                                {/* Note */}
                                <TableCell className="max-w-[250px] break-words">
                                    {editId === entry._id ? (
                                        <Textarea
                                            ref={inputRef}
                                            value={editNote}
                                            onChange={(e) => setEditNote(e.target.value)}
                                            onBlur={() => handleSave(entry)}
                                            className="min-w-[200px]"
                                        />
                                    ) : (
                                        entry.note || <span className="text-gray-400 italic">No note</span>
                                    )}
                                </TableCell>

                                {/* Actions */}
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <EllipsisVertical className="w-5 h-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            {editId === entry._id ? (
                                                <DropdownMenuItem onClick={() => handleSave(entry)}>
                                                    <Save className="w-4 h-4 mr-2" />
                                                    Save
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem
                                                    onClick={() => handleEdit(entry._id, entry.note)}
                                                >
                                                    <Pen className="w-4 h-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem
                                                variant="destructive"
                                                onClick={() => handleDelete(entry._id)}
                                                className="text-destruction focus:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default MoodHistory
