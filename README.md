API Mentor & Student 

1. Create Mentor (POST) : https://api-mentor-and-student.onrender.com/mentors/
    (request body) : {
        "name" : "mentor_name"
    }


2. Create Student (POST) : https://api-mentor-and-student.onrender.com/students/
    (request body) : {
        "name" : "student_name"
    }


3. Assign Student to Mentor (POST) : https://api-mentor-and-student.onrender.com/assign/assignStudentToMentor
    (request body) : {
        "studentId" : "student_Id",
        "mentorId" : "mentor_Id"
    }


4. Change Mentor for a particular Student (PUT) : https://api-mentor-and-student.onrender.com/assign/:studentId/assignMentor
    (request params) : student_Id
    (request body) : {
        "newMentorId" : "newMentor_Id"
    }


5. Get all students for a particular Mentor (GET) : https://api-mentor-and-student.onrender.com/mentors/:mentorId/students
    (request params) : mentor_Id


6. Get previously assigned Mentor for a particular Student (GET) : https://api-mentor-and-student.onrender.com/students/:studentId/previousMentor
    (request params) : student_Id