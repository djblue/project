curl -X GET http://localhost:3000/questions


curl -X POST -H 'Content-Type:application/json' -d '{"course_id": 1}'  http://localhost:3000/questions

curl -X POST -H 'Content-Type:application/json' -d '{"table": 16}'  http://localhost:3000/questions

curl -X POST -H 'Content-Type:application/json' -d '{"course_id": 1, "table": 16}'  http://localhost:3000/questions

curl -X GET http://localhost:3000/questions
