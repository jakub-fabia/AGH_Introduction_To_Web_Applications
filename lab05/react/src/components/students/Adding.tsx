import {useState} from "react";
import {Student} from "./StudentManager";

type AddingProps = {
    clickFunction : (student : Student) => void;
}

export function Adding({clickFunction} : AddingProps) {
    const [student, setStudent] = useState({
        firstName: "",
        lastName: "",
        year: "",
    });

    const handleAdd = (e) => {
        e.preventDefault();
        if (!student.firstName || !student.lastName || !student.year) {
            alert("Please fill all fields!");
            return;
        }
        if (parseInt(student.year) < 0 || isNaN(parseInt(student.year)) || parseInt(student.year) > (new Date().getFullYear())) {
            alert("Invalid year!");
            return;
        }
        const newStudent : Student = {
            firstName: student.firstName,
            lastName: student.lastName,
            year: parseInt(student.year)
        }
        clickFunction(newStudent)
        setStudent({
            firstName: "",
            lastName: "",
            year: "",
        });
    }

    const handleChange = (e, field: keyof Student) => {
        setStudent(prevState => ({ ...prevState, [field]: e.target.value }));
    }

    return (
        <div>
            <input
                type="text"
                value={student.firstName}
                onChange={(event) => handleChange(event, 'firstName')}
            />
            <input
                type="text"
                value={student.lastName}
                onChange={(event) => handleChange(event, 'lastName')}
            />
            <input
                type="text"
                value={student.year}
                onChange={(event) => handleChange(event, 'year')}
            />
            <button onClick={handleAdd}>Add student</button>
        </div>
    )
}