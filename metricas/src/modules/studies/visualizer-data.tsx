import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@shadcn/ui'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

type FormData = {
    name: string
    email: string
}

type TableData = {
    id: number
    name: string
    age: number
}

const MyDialog: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '' })
    const [tableData] = useState<TableData[]>([
        { id: 1, name: 'John Doe', age: 28 },
        { id: 2, name: 'Jane Doe', age: 22 },
    ])

    const [chartData] = useState({
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
            {
                label: 'Messages Sent',
                data: [100, 200, 300, 400],
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    })

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', formData)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>My Dialog</DialogTitle>
            <DialogContent>
                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Submit
                    </Button>
                </form>

                {/* Table Section */}
                <TableContainer className="mt-6">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.age}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Chart Section */}
                <div className="mt-6">
                    <Line data={chartData} />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default MyDialog
