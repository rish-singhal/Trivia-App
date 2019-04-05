package main

import (
   "fmt"
   "github.com/gin-contrib/cors"                        // Why do we need this package?
   "github.com/gin-gonic/gin"
   "github.com/jinzhu/gorm"
   _ "github.com/jinzhu/gorm/dialects/sqlite"           // If you want to use mysql or any other db, replace this line
)

var db *gorm.DB                                         // declaring the db globally
var err error

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
   db, err = gorm.Open("sqlite3", "./gorm.db")
   if err != nil {
      fmt.Println(err)
   }
   defer db.Close()

   db.AutoMigrate(&Person{})
   r := gin.Default()
   r.GET("/users/", ShowUsers) 
   r.GET("/quizzes/", ShowQuiz)
   r.GET("/quizzes/:id", ShowQuestions)                              // Creating routes for each functionality
   r.GET("/people/:id", GetPerson)
   r.POST("/crquiz", CreateQuiz)
   r.POST("/crquestion", CreateQuiz)
   r.POST("/addques", CreateQuestion)
   r.POST("/signup", SignUp)
   r.PUT("/people/:id", UpdatePerson)
   r.DELETE("/people/:id", DeletePerson)
   r.DELETE("/quizzes/:id", DeleteQuiz)
   r.DELETE("/question/:id", DeleteQues)
   r.Use((cors.Default()))
   r.Run(":8080")                                           // Run on port 8080
}


func DeletePerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   d := db.Where("id = ?", id).Delete(&person)
   fmt.Println(d)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQuiz(c *gin.Context) {
   id := c.Params.ByName("id")
   var ge Genre
   var qu Quiz
   d := db.Where("id = ?", id).Delete(&ge)
   p := db.Where("quizid = ?", id).Delete(&qu)
   fmt.Println(d)
   fmt.Println(p)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func DeleteQues(c *gin.Context) {
   id := c.Params.ByName("id")
   var qu Quiz
   p := db.Where("id = ?", id).Delete(&qu)
   fmt.Println(p)
   c.Header("access-control-allow-origin", "*")
   c.JSON(200, gin.H{"id #" + id: "deleted"})
}

func UpdatePerson(c *gin.Context) {
   var person Person
   id := c.Params.ByName("id")
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   }
   c.BindJSON(&person)
   db.Save(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func SignUp(c *gin.Context) {
   var person Person
   c.BindJSON(&person)
   db.Create(&person)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, person)
}

func CreateQuiz(c *gin.Context) {
   var quiz Genre
   c.BindJSON(&quiz)
   db.Create(&quiz)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, quiz)
}

func CreateQuestion(c *gin.Context) {
   var quiz Quiz
   c.BindJSON(&quiz)
   db.Create(&quiz)
   c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
   c.JSON(200, quiz)
}

func GetPerson(c *gin.Context) {
   id := c.Params.ByName("id")
   var person Person
   if err := db.Where("id = ?", id).First(&person).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, person)
   }
}

func ShowQuestions(c *gin.Context) {
   id := c.Params.ByName("id")
   fmt.Println(id)
   var quiz []Quiz
   if err := db.Where("quizid = ?", id).Find(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, quiz)
   }
}

func ShowUsers(c *gin.Context) {
   var people []Person
   if err := db.Find(&people).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, people)
   }
}

func ShowQuiz(c *gin.Context) {
   var quiz []Genre
   if err := db.Find(&quiz).Error; err != nil {
      c.AbortWithStatus(404)
      fmt.Println(err)
   } else {
      c.Header("access-control-allow-origin", "*") // Why am I doing this? Find out. Try running with this line commented
      c.JSON(200, quiz)
   }
}