# The Question Queue

The question queue is available at
[localhost:3000/queue](localhost:3000/queue), and is automatically updated
(using socket.io) whenever a new question enters the queue. It shows the
15 most recent questions and truncates the rest.

Questions are displayed with their queue number, table number, and
specific subject. This gives the tutors all of the information they need
to help the students.

NOTE: The question queue has now input into the system, it merely servers
as an output to the state of the system.
