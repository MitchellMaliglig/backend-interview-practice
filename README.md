# backend-interview-practice
Movies backend practice

## List all movie entries
http GET localhost:3000/api/movies   
![image](https://github.com/user-attachments/assets/76c430ef-c2ec-407f-8d58-bfdea5f831ac)

## Create a movie entry
http POST http://localhost:3000/api/movies title="Movie Title" summary="This is a summary." link="http://example.com" rating=5
![image](https://github.com/user-attachments/assets/846361b5-de80-4049-bc4c-5400130c587c)
![image](https://github.com/user-attachments/assets/cab71037-887c-447e-a781-3541b475ef09)

## Update a movie entry
http PUT http://localhost:3000/api/movies/4 title="Updated Movie Title" summary="Updated summary." link="http://updated-link.com" rating=4
![image](https://github.com/user-attachments/assets/d141c4aa-149e-42fd-afa8-e775f7a34ca5)
![image](https://github.com/user-attachments/assets/573f983c-cedf-4076-9660-9daa5c7f0520)

## Delete a movie entry
