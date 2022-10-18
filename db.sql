#database created in MySql
#database queries

use student;

CREATE TABLE student_info (
  userName varchar(25),
  rollNo int,
  stdClass int,
  tsub int,
  age int
);
insert into student_info values('ajay', 1, 5, 4, 10),('anil', 2, 6, 5, 11),('amar', 3, 7, 6, 12);

SELECT * FROM student.student_info;
