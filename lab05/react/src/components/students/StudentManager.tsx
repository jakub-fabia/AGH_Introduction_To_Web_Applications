import {useState} from "react";
import {Adding} from "./Adding";

export interface Student {
    firstName: string;
    lastName: string;
    year: number;
}

export function StudentManager() {
    const [students, setStudents] = useState<Student[]>([
        {
            firstName: "Joe",
            lastName: "Black",
            year: 1998,
        },
        {
            firstName: "Tyler",
            lastName: "Durden",
            year: 1999,
        },
        {
            firstName: "Mickey",
            lastName: "O'Neil",
            year: 2000,
        },
        {
            firstName: "Cliff",
            lastName: "Booth",
            year: 2019,
        },
        {
            firstName: "Aldo",
            lastName: "Raine",
            year: 2009,
        }
    ]);
    function addStudent(student: Student) {
        setStudents(prevStudents => [...prevStudents, student]);
    }
    return (
        <div>
            <table>
                <tr>
                    <td>No.</td>
                    <td>First name</td>
                    <td>Last name</td>
                    <td>Enrollment year</td>
                </tr>
                {students.map((student, index) => (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.year}</td>
                    </tr>
                ))}
            </table>
            <Adding clickFunction={addStudent}/>
        </div>
    )
}