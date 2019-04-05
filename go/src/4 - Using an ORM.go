package main

import (
  "fmt"
  "github.com/jinzhu/gorm"                            // ORM package for Go
  _ "github.com/jinzhu/gorm/dialects/sqlite"          // for SQLite. Only imports functions so that ORM can use. Hence the '_'
)

// This is the structure for your database. Very similar to how SQLAlchemy works with Flask.
type Person struct {
  ID uint `json:"id"`
  FullName string `json:"name"`
  UserName string `json:"username"`
  Password string `json:"passwd"`
}

type Quiz struct {
  ID uint `json:"id"`
  Quizid string `json:"quizid"`
  Question string `json:"question"`
  Option1 string `json:"option1"`
  Option2 string `json:"option2"`
  Option3 string `json:"option3"`
  Option4 string `json:"option4"`
  QType string `json:"qtype"`
  Answer uint `json:"answer"`
}

type Genre struct{
  ID uint `json:"id"`
  Genre string `json:"genre"`
  QuizName string `json:"qname"`
}

func main() {
   db, _ := gorm.Open("sqlite3", "./gorm.db")             
   defer db.Close()                                      
   db.AutoMigrate(&Person{},&Quiz{},&Genre{})                    
   p1 := Person{FullName: "Admin", UserName: "Admin", Password: "Admin"}  
   p2 := Person{FullName: "Rishabh Singhal", UserName: "SillentEuler", Password: "12345"}  
   g1 := Genre{Genre:"Computer",QuizName: "Computer Quiz 1"} 
   g2 := Genre{Genre:"Computer",QuizName: "Computer Quiz 2"} 
   q11p1 := Quiz{Quizid: "1",Question: "The sampling rate, (how many samples per second are stored) for a CD is...?",Option1: "48.4kHz", Option2: "22,050 Hz", Option3: "44.1 kHz", Option4: "48 kHz",QType:"0",Answer: 3}
   q11p2:=  Quiz{Quizid: "1",Question: "Compact discs, (according to the original CD specifications) hold how many minutes of music?",Option1: "74 mins", Option2: "56 mins", Option3: "60 mins", Option4: "90 mins",QType:"0", Answer: 1}
   q11p3 := Quiz{Quizid: "1",Question: "The base 10 (or decimal - our normal way of counting) number 65535 is represented in hexadecimal as...?",Option1: "0xFFFFF", Option2: "0xFFFF", Option3: "0xFFF", Option4: "0xFFFFFF",QType:"0", Answer: 2}
   q11p4 := Quiz{Quizid: "1",Question: "Where is the headquarters of Microsoft located?",Option1: "Santa Clara, California ", Option2: "Tucson, Arizona ", Option3: "Richmond, Virginia", Option4: "Redmond, Washington",QType:"0", Answer: 1}
   q11p5 := Quiz{Quizid: "1",Question: "In what year was the '@' chosen for its use in e-mail addresses?",Option1: " 1976 ", Option2: "1972 ", Option3: "1980", Option4: "1984",QType:"0", Answer: 2}
   
   q21p1 := Quiz{Quizid: "2",Question: "What was the first ARPANET message?",Option1: "lo", Option2: "hello world", Option3: "mary had a little lamb", Option4: "hi dude!",QType:"0", Answer: 1}
   q21p2 := Quiz{Quizid: "2",Question: "Where is the headquarters of Intel located?",Option1: "Santa Clara, California ", Option2: "Tucson, Arizona ", Option3: "Richmond, Virginia", Option4: "Redmond, Washington",QType:"0", Answer: 1}
   q21p3 := Quiz{Quizid: "2",Question: "In which year was MIDI introduced?",Option1: "1987", Option2: "1983", Option3: "1973", Option4: "1977",QType:"0", Answer: 2}
   q21p4 := Quiz{Quizid: "2",Question: "'.BAK' extension refers usually to what kind of file?",Option1: "MS file", Option2: "Backup file ", Option3: "Audio file", Option4: "Movie File",QType:"0", Answer: 2}
   q21p5 := Quiz{Quizid: "2",Question: " '.MPG' extension refers usually to what kind of file?",Option1: "WordPerfect Document file", Option2: " MS Office document  ", Option3: "Animation/movie file ", Option4: "Image File",QType:"0", Answer: 3}
   
   g3 := Genre{Genre:"India",QuizName: "India Quiz 1"} 
   g4 := Genre{Genre:"India",QuizName: "India Quiz 2"} 
   q12p1 := Quiz{Quizid: "3",Question: "Where is Fort William located ?",Option1: "Chennai", Option2: "Goa", Option3: "Kolkata", Option4: "Mysore",QType:"0", Answer: 3}
   q12p2 := Quiz{Quizid: "3",Question: "Name this Indian Tennis player who has turned Hollywood filmmaker?",Option1: "Leander Paes", Option2: "Mahesh Bhupathi", Option3: "Vijay amritraj", Option4: "Ashok Amritraj",QType:"0", Answer: 4}
   q12p3 := Quiz{Quizid: "3",Question: "Sishu is the literary work of which Indian author?",Option1: "Vikram Seth", Option2: "Jawaharlal Nehru", Option3: "Rabindranath Tagore", Option4: "Arundhati Roy",QType:"0", Answer: 3}
   q12p4 := Quiz{Quizid: "3",Question: "Which of these Cities located in the state of Gujarat is famous for zari production?",Option1: "Surat ", Option2: "Rajkot ", Option3: "Surendranagar", Option4: "Ahmedabad",QType:"0", Answer: 1}
   q12p5 := Quiz{Quizid: "3",Question: "Which State in India is the largest producer of Soyabean?",Option1: "Rajasthan ", Option2: "Gujarat", Option3: "Uttar Pradesh", Option4: "Madhya Pradesh",QType:"0", Answer: 4}
   
   q22p1 := Quiz{Quizid: "4",Question: "The western ghats in Maharashtra is known as...?",Option1: "Nilgiris", Option2: "Sahyadris", Option3: "Cardamon Hills", Option4: "Annamalai",QType:"0", Answer: 2}
   q22p2 := Quiz{Quizid: "4",Question: "On which riverbank is Goa located?",Option1: "Ganga", Option2: "Mandovi", Option3: "Gomati", Option4: "Sabarmati",QType:"0", Answer: 2}
   q22p3 := Quiz{Quizid: "4",Question: "Which state is known as India's Spice Garden...?",Option1: "Kerela", Option2: "Karnataka", Option3: "Bihar", Option4: "Uttaranchal",QType:"0", Answer: 1}
   q22p4 := Quiz{Quizid: "4",Question: "Thumba in Kerala is famous because...?",Option1: "It has several industries ", Option2: "It is a rocket launching station  ", Option3: "It is a harbour ", Option4: "It has an international airport",QType:"0", Answer: 2}
   q22p5 := Quiz{Quizid: "4",Question: "Which of these places is not located in Mumbai?",Option1: "The Gateway of India", Option2: "The Kamala Nehru Park", Option3: "The Juhu Beach", Option4: "The Charminar",QType:"0", Answer: 4}

   db.Create(&p1)
   db.Create(&p2)
   
   db.Create(&g1)
   db.Create(&g2)
   db.Create(&g3)
   db.Create(&g4) 

   db.Create(&q11p1) 
   db.Create(&q11p2) 
   db.Create(&q11p3) 
   db.Create(&q11p4) 
   db.Create(&q11p5) 

   db.Create(&q21p1) 
   db.Create(&q21p2) 
   db.Create(&q21p3) 
   db.Create(&q21p4) 
   db.Create(&q21p5)

   db.Create(&q12p1) 
   db.Create(&q12p2) 
   db.Create(&q12p3) 
   db.Create(&q12p4) 
   db.Create(&q12p5)

   db.Create(&q22p1) 
   db.Create(&q22p2) 
   db.Create(&q22p3) 
   db.Create(&q22p4) 
   db.Create(&q22p5)

   var p3 Person                                        
   db.First(&p3)                                         
   fmt.Println(p3.FullName)
   fmt.Println(p3.UserName)                              
}
